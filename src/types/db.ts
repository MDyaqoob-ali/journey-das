export type LearningState =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'SOLVED_INDEPENDENTLY'
  | 'SOLVED_WITH_HINT'
  | 'SOLVED_WITH_SOLUTION'
  | 'FAILED'
  | 'SOLVED_TOO_SLOWLY'
  | 'FORGOT_PATTERN'
  | 'REVIEW_DUE'
  | 'MASTERED';

export interface ProblemProgress {
  problemId: string;
  leetcodeNumber: number;
  slug: string;
  status: LearningState;
  firstAttemptDate?: string;
  lastAttemptDate?: string;
  attemptCount: number;
  accepted: boolean;
  neededHint: boolean;
  neededSolution: boolean;
  solveTimeSeconds: number;
  confidence: number; // 1 to 5
  canExplain: boolean;
  canCodeFromScratch: boolean;
  forgotPattern: boolean;
  notes: string;
  lastSubmissionId?: string;
  lastRuntimeMs?: number;
  lastMemoryMb?: number;
  githubSyncStatus: 'NONE' | 'PENDING' | 'SYNCED' | 'FAILED';
}

export type AttemptResult =
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'TIME_LIMIT_EXCEEDED'
  | 'MEMORY_LIMIT_EXCEEDED'
  | 'RUNTIME_ERROR'
  | 'COMPILE_ERROR'
  | 'MANUAL_COMPLETION';

export interface AttemptRecord {
  id: string;
  problemId: string;
  timestamp: number;
  result: AttemptResult;
  language: string;
  code: string;
  runtimeMs?: number;
  memoryMb?: number;
  solveTimeSeconds: number;
  confidence: number; // 1-5
  neededHint: boolean;
  neededSolution: boolean;
  canExplain: boolean;
  canCodeFromScratch: boolean;
  submissionId?: string;
  notes?: string;
}

export interface StudySession {
  id: string;
  problemId: string;
  startedAt: number;
  endedAt?: number;
  activeTimeSeconds: number;
  state: 'RUNNING' | 'PAUSED' | 'COMPLETED';
  pausedAt?: number;
}

export interface ReviewItem {
  id: string;
  problemId: string;
  scheduledDate: string; // YYYY-MM-DD
  intervalDays: number;
  stage: number; // 1 to 6
  reason: string;
  completedDate?: string;
  status: 'DUE' | 'COMPLETED' | 'SKIPPED';
}

export type GithubSyncStatus =
  | 'PENDING'
  | 'UPLOADING'
  | 'SYNCED'
  | 'FAILED'
  | 'RETRYING'
  | 'MANUAL_ACTION_REQUIRED';

export interface GithubSyncJob {
  id: string;
  problemId: string;
  submissionId?: string;
  status: GithubSyncStatus;
  solutionCode: string;
  language: string;
  runtimeMs?: number;
  memoryMb?: number;
  attempts: number;
  lastError?: string;
  filePath: string;
  createdAt: number;
  syncedAt?: number;
  commitSha?: string;
  commitUrl?: string;
}

export interface InterviewSessionRecord {
  id: string;
  date: string;
  durationMinutes: number;
  problemIds: string[];
  notes: string;
  timeToApproachSeconds: number;
  complexityExplained: boolean;
  communicationScore: number; // 1 to 5
  edgeCasesCovered: boolean;
  followUpSolved: boolean;
  completed: boolean;
}

export interface ErrorLogEntry {
  id: string;
  problemId: string;
  date: string;
  category:
    | 'KNOWLEDGE_GAP'
    | 'IMPLEMENTATION_BUG'
    | 'EDGE_CASE'
    | 'TIME_COMPLEXITY'
    | 'PATIENCE_FOCUS';
  description: string;
  lessonLearned: string;
}

export interface StlConceptProgress {
  id: string;
  name: string;
  category: 'CONTAINER' | 'ALGORITHM' | 'UTILITY' | 'LANGUAGE_FEATURE';
  stage: 'INTRODUCED' | 'USED' | 'REINFORCED' | 'MIXED_PRACTICE' | 'MASTERED';
  lastUsedDate?: string;
  canExplain: boolean;
  canCodeWithoutReference: boolean;
}
