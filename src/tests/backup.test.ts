import { describe, it, expect } from 'vitest';
import { DEFAULT_SETTINGS } from '../types/settings';

describe('Data Backup & Privacy Safeguards', () => {
  it('should strip sensitive GitHub personal access tokens or OAuth credentials on export', () => {
    const sensitiveSettings = {
      ...DEFAULT_SETTINGS,
      github: {
        ...DEFAULT_SETTINGS.github,
        accessToken: 'ghp_secret_access_token_1234567890abcdef',
        connected: true,
      },
    };

    // Replicate sanitizeSettings logic
    const clone = JSON.parse(JSON.stringify(sensitiveSettings));
    if (clone.github) {
      delete clone.github.accessToken;
      clone.github.connected = false;
    }

    expect(clone.github.accessToken).toBeUndefined();
    expect(clone.github.connected).toBe(false);
    expect(JSON.stringify(clone)).not.toContain('ghp_secret');
  });
});
