export type GithubAuthMethod = 'PKCE' | 'PAT';

export interface GithubSettings {
  authMethod: GithubAuthMethod;
  accessToken?: string;
  username?: string;
  repo: string;
  branch: string;
  rootDir: string;
  fileFormat: string;
  autoUpload: boolean;
  autoUploadNonCpp: boolean;
  commitMsgTemplate: string;
  generateReadme: boolean;
  readmeTemplate?: string;
  connected: boolean;
}

export interface StudySettings {
  startDate: string;
  dailyMaxProblems: number;
  preferredDayCapacity: number;
  defaultDifficultyVisibility: 'SHOW' | 'HIDE';
  patternVisibilityPolicy: 'AUTO' | 'ALWAYS_SHOW' | 'ALWAYS_HIDE';
  restDays: number[]; // 0 = Sunday, 6 = Saturday
  missedDayPolicy: 'SMOOTH_LOAD' | 'PRESERVE_PREREQS';
}

export interface TimerPreferences {
  autoStartOnLeetCode: boolean;
  autoStopOnAccepted: boolean;
  soundOnFinish: boolean;
}

export interface UserSettings {
  theme: 'system' | 'dark' | 'light';
  onboardingCompleted: boolean;
  github: GithubSettings;
  study: StudySettings;
  timer: TimerPreferences;
  notificationsEnabled: boolean;
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  onboardingCompleted: false,
  github: {
    authMethod: 'PAT',
    repo: '',
    branch: 'main',
    rootDir: 'leetcode/',
    fileFormat: '{rootDir}/{paddedNumber}-{slug}/solution.cpp',
    autoUpload: true,
    autoUploadNonCpp: false,
    commitMsgTemplate: 'solve: LeetCode #{number} - {title}',
    generateReadme: true,
    connected: false,
  },
  study: {
    startDate: new Date().toISOString().slice(0, 10),
    dailyMaxProblems: 5,
    preferredDayCapacity: 2,
    defaultDifficultyVisibility: 'SHOW',
    patternVisibilityPolicy: 'AUTO',
    restDays: [0], // Sunday rest day by default
    missedDayPolicy: 'SMOOTH_LOAD',
  },
  timer: {
    autoStartOnLeetCode: true,
    autoStopOnAccepted: true,
    soundOnFinish: true,
  },
  notificationsEnabled: true,
};
