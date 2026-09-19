import { getDB, getAllProblemProgress, getAttempts, getAllReviews, getInterviewSessions, getErrorLogs, getAllStlProgress } from './database';
import { getSettings, saveSettings } from './settings-storage';

export interface BackupPayload {
  version: string;
  exportDate: string;
  settings: ReturnType<typeof sanitizeSettings>;
  problems: Awaited<ReturnType<typeof getAllProblemProgress>>;
  attempts: Awaited<ReturnType<typeof getAttempts>>;
  reviews: Awaited<ReturnType<typeof getAllReviews>>;
  interviewSessions: Awaited<ReturnType<typeof getInterviewSessions>>;
  errorLogs: Awaited<ReturnType<typeof getErrorLogs>>;
  stlProgress: Awaited<ReturnType<typeof getAllStlProgress>>;
}

function sanitizeSettings(settings: Awaited<ReturnType<typeof getSettings>>) {
  const clone = JSON.parse(JSON.stringify(settings));
  // Strip access tokens or sensitive credentials
  if (clone.github) {
    delete clone.github.accessToken;
    clone.github.connected = false;
  }
  return clone;
}

export async function exportAllData(): Promise<string> {
  const [settings, problems, attempts, reviews, interviewSessions, errorLogs, stlProgress] =
    await Promise.all([
      getSettings(),
      getAllProblemProgress(),
      getAttempts(),
      getAllReviews(),
      getInterviewSessions(),
      getErrorLogs(),
      getAllStlProgress(),
    ]);

  const payload: BackupPayload = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    settings: sanitizeSettings(settings),
    problems,
    attempts,
    reviews,
    interviewSessions,
    errorLogs,
    stlProgress,
  };

  return JSON.stringify(payload, null, 2);
}

export async function importAllData(jsonStr: string): Promise<{ success: boolean; message: string }> {
  try {
    const data: Partial<BackupPayload> = JSON.parse(jsonStr);

    if (!data.problems || !Array.isArray(data.problems)) {
      return { success: false, message: 'Invalid backup file: missing problems array' };
    }

    const db = await getDB();

    // Import problems
    const txProblems = db.transaction('problems', 'readwrite');
    for (const prob of data.problems) {
      await txProblems.store.put(prob);
    }
    await txProblems.done;

    // Import attempts
    if (data.attempts && Array.isArray(data.attempts)) {
      const txAttempts = db.transaction('attempts', 'readwrite');
      for (const att of data.attempts) {
        await txAttempts.store.put(att);
      }
      await txAttempts.done;
    }

    // Import reviews
    if (data.reviews && Array.isArray(data.reviews)) {
      const txReviews = db.transaction('reviews', 'readwrite');
      for (const rev of data.reviews) {
        await txReviews.store.put(rev);
      }
      await txReviews.done;
    }

    // Import interview sessions
    if (data.interviewSessions && Array.isArray(data.interviewSessions)) {
      const txInterviews = db.transaction('interviewSessions', 'readwrite');
      for (const session of data.interviewSessions) {
        await txInterviews.store.put(session);
      }
      await txInterviews.done;
    }

    // Import error logs
    if (data.errorLogs && Array.isArray(data.errorLogs)) {
      const txErrors = db.transaction('errorLogs', 'readwrite');
      for (const err of data.errorLogs) {
        await txErrors.store.put(err);
      }
      await txErrors.done;
    }

    // Import STL progress
    if (data.stlProgress && Array.isArray(data.stlProgress)) {
      const txStl = db.transaction('stlProgress', 'readwrite');
      for (const item of data.stlProgress) {
        await txStl.store.put(item);
      }
      await txStl.done;
    }

    // Restore settings if present
    if (data.settings) {
      await saveSettings(data.settings);
    }

    return {
      success: true,
      message: `Successfully imported ${data.problems.length} problems and associated history!`,
    };
  } catch (err: any) {
    return { success: false, message: `Failed to import data: ${err?.message || 'Unknown error'}` };
  }
}
