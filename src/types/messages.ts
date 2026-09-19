import type { AttemptRecord, GithubSyncJob, ProblemProgress, StudySession } from './db';
import type { CurriculumProblem } from './curriculum';
import type { UserSettings } from './settings';

export type MessageType =
  | 'GET_CURRENT_PROBLEM'
  | 'CURRENT_PROBLEM_RESPONSE'
  | 'START_SESSION'
  | 'PAUSE_SESSION'
  | 'RESUME_SESSION'
  | 'GET_SESSION'
  | 'SESSION_UPDATE'
  | 'SUBMISSION_DETECTED'
  | 'LEETCODE_ACCEPTED'
  | 'LEETCODE_REJECTED'
  | 'GET_TODAYS_PLAN'
  | 'GET_REVIEWS_DUE'
  | 'TRIGGER_GITHUB_SYNC'
  | 'GITHUB_SYNC_STATUS'
  | 'OPEN_LEETCODE_PROBLEM'
  | 'GET_SETTINGS'
  | 'UPDATE_SETTINGS'
  | 'GET_PROGRESS_SUMMARY';

export interface BaseMessage {
  type: MessageType;
}

export interface GetCurrentProblemMessage extends BaseMessage {
  type: 'GET_CURRENT_PROBLEM';
  slug: string;
}

export interface CurrentProblemResponse extends BaseMessage {
  type: 'CURRENT_PROBLEM_RESPONSE';
  curriculumProblem?: CurriculumProblem;
  progress?: ProblemProgress;
  activeSession?: StudySession;
}

export interface StartSessionMessage extends BaseMessage {
  type: 'START_SESSION';
  problemId: string;
}

export interface PauseSessionMessage extends BaseMessage {
  type: 'PAUSE_SESSION';
  problemId: string;
}

export interface ResumeSessionMessage extends BaseMessage {
  type: 'RESUME_SESSION';
  problemId: string;
}

export interface SubmissionDetectedMessage extends BaseMessage {
  type: 'SUBMISSION_DETECTED';
  slug: string;
  verdict: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILE_ERROR';
  language: string;
  code?: string;
  runtimeMs?: number;
  memoryMb?: number;
  submissionId?: string;
}

export interface TriggerGithubSyncMessage extends BaseMessage {
  type: 'TRIGGER_GITHUB_SYNC';
  jobId?: string;
}

export interface OpenLeetCodeProblemMessage extends BaseMessage {
  type: 'OPEN_LEETCODE_PROBLEM';
  url: string;
  problemId: string;
}

export type ExtensionMessage =
  | GetCurrentProblemMessage
  | CurrentProblemResponse
  | StartSessionMessage
  | PauseSessionMessage
  | ResumeSessionMessage
  | SubmissionDetectedMessage
  | TriggerGithubSyncMessage
  | OpenLeetCodeProblemMessage
  | { type: 'GET_SETTINGS' }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<UserSettings> }
  | { type: 'GET_TODAYS_PLAN' }
  | { type: 'GET_REVIEWS_DUE' }
  | { type: 'GET_PROGRESS_SUMMARY' }
  | { type: 'GET_SESSION'; problemId: string };
