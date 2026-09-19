import { getSettings, saveSettings } from '../db/settings-storage';

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
}

export async function verifyGithubToken(token: string): Promise<{ success: boolean; user?: GitHubUser; error?: string }> {
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        return { success: false, error: 'Bad credentials or expired token' };
      }
      return { success: false, error: `GitHub API error: ${res.statusText} (${res.status})` };
    }

    const user: GitHubUser = await res.json();
    return { success: true, user };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error connecting to GitHub' };
  }
}

export async function connectWithPAT(token: string): Promise<{ success: boolean; user?: GitHubUser; error?: string }> {
  const cleanToken = token.trim();
  if (!cleanToken) {
    return { success: false, error: 'Token cannot be empty' };
  }

  const result = await verifyGithubToken(cleanToken);
  if (result.success && result.user) {
    await saveSettings({
      github: {
        ...(await getSettings()).github,
        accessToken: cleanToken,
        username: result.user.login,
        connected: true,
        authMethod: 'PAT',
      },
    });
  }
  return result;
}

export async function disconnectGithub(): Promise<void> {
  const current = await getSettings();
  await saveSettings({
    github: {
      ...current.github,
      accessToken: undefined,
      username: undefined,
      connected: false,
    },
  });
}

/**
 * Initiates PKCE OAuth flow using chrome.identity
 */
export async function startGithubPKCE(clientId: string): Promise<{ success: boolean; error?: string }> {
  if (typeof chrome === 'undefined' || !chrome.identity) {
    return { success: false, error: 'Chrome Identity API not available in this environment' };
  }

  try {
    const redirectUri = chrome.identity.getRedirectURL('github');
    const state = generateRandomString(32);
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', 'repo');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    const redirectResponse = await chrome.identity.launchWebAuthFlow({
      url: authUrl.toString(),
      interactive: true,
    });

    if (!redirectResponse) {
      return { success: false, error: 'OAuth authorization cancelled or failed' };
    }

    const responseUrl = new URL(redirectResponse);
    const returnedState = responseUrl.searchParams.get('state');
    const code = responseUrl.searchParams.get('code');

    if (returnedState !== state) {
      return { success: false, error: 'State validation failed (CSRF mismatch)' };
    }

    if (!code) {
      return { success: false, error: 'No authorization code returned from GitHub' };
    }

    return {
      success: true,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'PKCE Authorization failed' };
  }
}

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(digest);
}

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
