import { openDB, type IDBPDatabase } from 'idb';
import type {
  AttemptRecord,
  ErrorLogEntry,
  GithubSyncJob,
  GithubSyncStatus,
  InterviewSessionRecord,
  ProblemProgress,
  ReviewItem,
  StlConceptProgress,
  StudySession,
} from '../types/db';
import stlCatalog from '../data/stl-catalog.json';

const DB_NAME = 'dsa_progress_tracker_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Problems progress store
        if (!db.objectStoreNames.contains('problems')) {
          const problemStore = db.createObjectStore('problems', { keyPath: 'problemId' });
          problemStore.createIndex('status', 'status');
          problemStore.createIndex('leetcodeNumber', 'leetcodeNumber');
        }

        // Attempts store
        if (!db.objectStoreNames.contains('attempts')) {
          const attemptStore = db.createObjectStore('attempts', { keyPath: 'id' });
          attemptStore.createIndex('problemId', 'problemId');
          attemptStore.createIndex('timestamp', 'timestamp');
          attemptStore.createIndex('result', 'result');
        }

        // Study sessions (timers)
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
          sessionStore.createIndex('problemId', 'problemId');
          sessionStore.createIndex('state', 'state');
        }

        // Spaced repetition reviews
        if (!db.objectStoreNames.contains('reviews')) {
          const reviewStore = db.createObjectStore('reviews', { keyPath: 'id' });
          reviewStore.createIndex('scheduledDate', 'scheduledDate');
          reviewStore.createIndex('problemId', 'problemId');
          reviewStore.createIndex('status', 'status');
        }

        // GitHub sync queue
        if (!db.objectStoreNames.contains('githubQueue')) {
          const queueStore = db.createObjectStore('githubQueue', { keyPath: 'id' });
          queueStore.createIndex('status', 'status');
          queueStore.createIndex('problemId', 'problemId');
          queueStore.createIndex('createdAt', 'createdAt');
        }

        // Interview sessions
        if (!db.objectStoreNames.contains('interviewSessions')) {
          const interviewStore = db.createObjectStore('interviewSessions', { keyPath: 'id' });
          interviewStore.createIndex('date', 'date');
        }

        // Error logs
        if (!db.objectStoreNames.contains('errorLogs')) {
          const errorStore = db.createObjectStore('errorLogs', { keyPath: 'id' });
          errorStore.createIndex('problemId', 'problemId');
          errorStore.createIndex('category', 'category');
        }

        // C++ STL progress
        if (!db.objectStoreNames.contains('stlProgress')) {
          db.createObjectStore('stlProgress', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

// Problem Progress Operations
export async function getProblemProgress(problemId: string): Promise<ProblemProgress | undefined> {
  const db = await getDB();
  return db.get('problems', problemId);
}

export async function getAllProblemProgress(): Promise<ProblemProgress[]> {
  const db = await getDB();
  return db.getAll('problems');
}

export async function saveProblemProgress(progress: ProblemProgress): Promise<void> {
  const db = await getDB();
  await db.put('problems', progress);
}

// Attempts Operations
export async function recordAttempt(attempt: AttemptRecord): Promise<void> {
  const db = await getDB();
  await db.put('attempts', attempt);
}

export async function getAttempts(problemId?: string): Promise<AttemptRecord[]> {
  const db = await getDB();
  if (problemId) {
    return db.getAllFromIndex('attempts', 'problemId', problemId);
  }
  return db.getAll('attempts');
}

// Study Session Operations (Persistent Timer)
export async function getActiveSession(problemId?: string): Promise<StudySession | undefined> {
  const db = await getDB();
  const allRunning = await db.getAllFromIndex('sessions', 'state', 'RUNNING');
  const allPaused = await db.getAllFromIndex('sessions', 'state', 'PAUSED');
  const candidates = [...allRunning, ...allPaused];

  if (problemId) {
    return candidates.find((s) => s.problemId === problemId);
  }
  return candidates[candidates.length - 1];
}

export async function saveSession(session: StudySession): Promise<void> {
  const db = await getDB();
  await db.put('sessions', session);
}

// Spaced Repetition Review Operations
export async function getAllReviews(): Promise<ReviewItem[]> {
  const db = await getDB();
  return db.getAll('reviews');
}

export async function getReviewsDue(dateStr?: string): Promise<ReviewItem[]> {
  const db = await getDB();
  const today = dateStr || new Date().toISOString().slice(0, 10);
  const all = await db.getAll('reviews');
  return all.filter((r) => r.status === 'DUE' && r.scheduledDate <= today);
}

export async function saveReview(review: ReviewItem): Promise<void> {
  const db = await getDB();
  await db.put('reviews', review);
}

// GitHub Sync Queue Operations
export async function getGithubQueue(status?: GithubSyncStatus): Promise<GithubSyncJob[]> {
  const db = await getDB();
  if (status) {
    return db.getAllFromIndex('githubQueue', 'status', status);
  }
  return db.getAll('githubQueue');
}

export async function enqueueGithubJob(job: GithubSyncJob): Promise<void> {
  const db = await getDB();
  await db.put('githubQueue', job);
}

export async function updateGithubJob(job: GithubSyncJob): Promise<void> {
  const db = await getDB();
  await db.put('githubQueue', job);
}

// Interview Sessions Operations
export async function getInterviewSessions(): Promise<InterviewSessionRecord[]> {
  const db = await getDB();
  return db.getAll('interviewSessions');
}

export async function saveInterviewSession(session: InterviewSessionRecord): Promise<void> {
  const db = await getDB();
  await db.put('interviewSessions', session);
}

// Error Logs Operations
export async function getErrorLogs(problemId?: string): Promise<ErrorLogEntry[]> {
  const db = await getDB();
  if (problemId) {
    return db.getAllFromIndex('errorLogs', 'problemId', problemId);
  }
  return db.getAll('errorLogs');
}

export async function addErrorLog(entry: ErrorLogEntry): Promise<void> {
  const db = await getDB();
  await db.put('errorLogs', entry);
}

// C++ STL Progress Operations
export async function getAllStlProgress(): Promise<StlConceptProgress[]> {
  const db = await getDB();
  const stored = await db.getAll('stlProgress');
  if (stored.length === 0) {
    // Initialize from catalog
    const initial: StlConceptProgress[] = stlCatalog.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category as StlConceptProgress['category'],
      stage: 'INTRODUCED',
      canExplain: false,
      canCodeWithoutReference: false,
    }));
    const tx = db.transaction('stlProgress', 'readwrite');
    for (const item of initial) {
      await tx.store.put(item);
    }
    await tx.done;
    return initial;
  }
  return stored;
}

export async function saveStlProgress(progress: StlConceptProgress): Promise<void> {
  const db = await getDB();
  await db.put('stlProgress', progress);
}
