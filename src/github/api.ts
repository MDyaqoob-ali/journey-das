import type { CurriculumProblem } from '../types/curriculum';

export interface GitHubCommitResult {
  success: boolean;
  sha?: string;
  htmlUrl?: string;
  error?: string;
  statusCode?: number;
}

export async function checkRepo(
  owner: string,
  repo: string,
  token: string
): Promise<{ exists: boolean; defaultBranch?: string; error?: string }> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (res.status === 404) {
      return { exists: false, error: `Repository "${owner}/${repo}" not found or unauthorized.` };
    }
    if (!res.ok) {
      return { exists: false, error: `GitHub error: ${res.statusText} (${res.status})` };
    }

    const data = await res.json();
    return { exists: true, defaultBranch: data.default_branch || 'main' };
  } catch (err: any) {
    return { exists: false, error: err?.message || 'Network error accessing GitHub repository' };
  }
}

export async function getFileSha(params: {
  owner: string;
  repo: string;
  path: string;
  branch: string;
  token: string;
}): Promise<string | undefined> {
  const { owner, repo, path: filePath, branch, token } = params;
  try {
    const cleanPath = filePath.replace(/^\/+/, '');
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${cleanPath}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data.sha;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

export async function commitFile(params: {
  owner: string;
  repo: string;
  branch: string;
  path: string;
  content: string; // Plain text
  message: string;
  token: string;
  existingSha?: string;
}): Promise<GitHubCommitResult> {
  const { owner, repo, branch, path: filePath, content, message, token, existingSha } = params;

  try {
    const cleanPath = filePath.replace(/^\/+/, '');
    // UTF-8 to Base64
    const base64Content = btoa(unescape(encodeURIComponent(content)));

    // If SHA wasn't passed, check if file exists
    let sha = existingSha;
    if (!sha) {
      sha = await getFileSha({ owner, repo, path: cleanPath, branch, token });
    }

    const body: Record<string, any> = {
      message,
      content: base64Content,
      branch,
    };
    if (sha) {
      body.sha = sha;
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${cleanPath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      let errText = res.statusText;
      try {
        const errJson = await res.json();
        if (errJson.message) errText = errJson.message;
      } catch {}
      return {
        success: false,
        statusCode: res.status,
        error: `Commit failed: ${errText} (HTTP ${res.status})`,
      };
    }

    const result = await res.json();
    return {
      success: true,
      sha: result.commit?.sha || result.content?.sha,
      htmlUrl: result.content?.html_url,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network exception while committing to GitHub',
    };
  }
}

export function generateProblemPath(
  problem: CurriculumProblem,
  rootDir: string = 'leetcode/'
): { codePath: string; readmePath: string } {
  const cleanRoot = rootDir.endsWith('/') ? rootDir : `${rootDir}/`;
  const paddedNum = String(problem.leetcodeNumber).padStart(4, '0');
  const folder = `${cleanRoot}${paddedNum}-${problem.slug}/`;

  return {
    codePath: `${folder}solution.cpp`,
    readmePath: `${folder}README.md`,
  };
}

export function generateReadmeContent(params: {
  problem: CurriculumProblem;
  runtimeMs?: number;
  memoryMb?: number;
  dateStr?: string;
}): string {
  const { problem, runtimeMs, memoryMb, dateStr = new Date().toISOString().slice(0, 10) } = params;

  return `# [${problem.leetcodeNumber}. ${problem.title}](${problem.url})

## Metadata
- **Difficulty:** \`${problem.difficulty}\`
- **Topic:** \`${problem.topic}\`
- **Patterns:** \`${problem.patterns.join(', ')}\`
- **Date Solved:** \`${dateStr}\`
${runtimeMs !== undefined ? `- **Runtime:** \`${runtimeMs} ms\`` : ''}
${memoryMb !== undefined ? `- **Memory:** \`${memoryMb} MB\`` : ''}

## Learning Purpose & Invariants
${problem.purpose}

## Recognition Triggers
${problem.recognitionTriggers.map((t) => `- ${t}`).join('\n')}

## Common Mistakes & Pitfalls
${problem.commonMistakes.map((m) => `- ${m}`).join('\n')}

---
*Auto-synced by [Journey Das](https://github.com).*
`;
}
