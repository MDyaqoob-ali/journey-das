import { DEFAULT_SETTINGS, type UserSettings } from '../types/settings';

const SETTINGS_KEY = 'dsa_tracker_settings';

export async function getSettings(): Promise<UserSettings> {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      const result = await chrome.storage.local.get(SETTINGS_KEY);
      if (result && result[SETTINGS_KEY]) {
        return { ...DEFAULT_SETTINGS, ...result[SETTINGS_KEY] };
      }
    } else if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    }
  } catch (err) {
    console.error('Error loading settings:', err);
  }
  return { ...DEFAULT_SETTINGS };
}

export async function saveSettings(updates: Partial<UserSettings>): Promise<UserSettings> {
  const current = await getSettings();
  const merged: UserSettings = {
    ...current,
    ...updates,
    github: {
      ...current.github,
      ...(updates.github || {}),
    },
    study: {
      ...current.study,
      ...(updates.study || {}),
    },
    timer: {
      ...current.timer,
      ...(updates.timer || {}),
    },
  };

  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ [SETTINGS_KEY]: merged });
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    }
  } catch (err) {
    console.error('Error saving settings:', err);
  }

  return merged;
}
