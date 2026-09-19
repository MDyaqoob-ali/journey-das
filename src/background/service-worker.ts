import { getProblemBySlug, getProblemById } from '../curriculum/curriculum';
import {
  getProblemProgress,
  saveProblemProgress,
  recordAttempt,
  saveSession,
  getActiveSession,
  saveReview,
  enqueueGithubJob,
  getReviewsDue,
  getAllProblemProgress,
} from '../db/database';
import { getSettings, saveSettings } from '../db/settings-storage';
import { computeNextReview } from '../curriculum/revision';
import { processSyncQueue, retryFailedJobs } from '../github/sync-queue';
import { generateProblemPath } from '../github/api';
import { calculateCurrentDayNumber, buildDailyWorkload } from '../curriculum/scheduler';
import type { ProblemProgress, StudySession, AttemptRecord, GithubSyncJob } from '../types/db';

// Initialize alarms on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('github-sync-retry', { periodInMinutes: 10 });
  chrome.alarms.create('daily-check', { periodInMinutes: 60 });
  updateBadge();
});

// Periodic alarm handler
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'github-sync-retry') {
    await processSyncQueue();
  } else if (alarm.name === 'daily-check') {
    await updateBadge();
  }
});

// Runtime message router
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  handleMessage(message)
    .then((res) => sendResponse(res))
    .catch((err) => {
      console.error('Service worker error handling message:', err);
      sendResponse({ error: err?.message || 'Internal error' });
    });
  return true; // Keep message channel open for async response
});

async function handleMessage(message: any): Promise<any> {
  switch (message.type) {
    case 'GET_CURRENT_PROBLEM': {
      const curriculumProb = getProblemBySlug(message.slug);
      let progress: ProblemProgress | undefined;
      let activeSession: StudySession | undefined;

      if (curriculumProb) {
        progress = await getProblemProgress(curriculumProb.id);
        activeSession = await getActiveSession(curriculumProb.id);
      }

      return {
        curriculumProblem: curriculumProb,
        progress,
        activeSession,
      };
    }

    case 'START_SESSION': {
      const { problemId } = message;
      const existing = await getActiveSession(problemId);
      const session: StudySession = {
        id: existing?.id || `sess-${problemId}-${Date.now()}`,
        problemId,
        startedAt: Date.now(),
        activeTimeSeconds: existing?.activeTimeSeconds || 0,
        state: 'RUNNING',
      };
      await saveSession(session);
      return { success: true, session };
    }

    case 'PAUSE_SESSION': {
      const { problemId } = message;
      const existing = await getActiveSession(problemId);
      if (existing && existing.state === 'RUNNING') {
        const elapsed = Math.floor((Date.now() - existing.startedAt) / 1000);
        existing.activeTimeSeconds += elapsed;
        existing.state = 'PAUSED';
        existing.pausedAt = Date.now();
        await saveSession(existing);
      }
      return { success: true };
    }

    case 'LEETCODE_ACCEPTED': {
      return await handleLeetCodeAccepted(message);
    }

    case 'LEETCODE_REJECTED': {
      return await handleLeetCodeRejected(message);
    }

    case 'OPEN_LEETCODE_PROBLEM': {
      if (message.url) {
        await chrome.tabs.create({ url: message.url });
      }
      return { success: true };
    }

    case 'GET_TODAYS_PLAN': {
      const settings = await getSettings();
      const dayNumber = calculateCurrentDayNumber(settings.study.startDate);
      const allProgress = await getAllProblemProgress();
      const progressMap = new Map<string, ProblemProgress>();
      for (const p of allProgress) {
        progressMap.set(p.problemId, p);
      }
      const dueReviews = await getReviewsDue();
      const workload = buildDailyWorkload({
        dayNumber,
        settings: settings.study,
        progressMap,
        dueReviews,
      });
      return { workload, settings };
    }

    case 'TRIGGER_GITHUB_SYNC': {
      await processSyncQueue();
      return { success: true };
    }

    case 'RETRY_FAILED_GITHUB': {
      await retryFailedJobs();
      return { success: true };
    }

    case 'GET_SETTINGS': {
      const settings = await getSettings();
      return { settings };
    }

    case 'UPDATE_SETTINGS': {
      const updated = await saveSettings(message.settings);
      return { settings: updated };
    }

    default:
      return { error: `Unhandled message type: ${message.type}` };
  }
}

async function handleLeetCodeAccepted(message: any) {
  const { slug, number, title, runtimeMs, memoryMb, submissionId, code, language, solveTimeSeconds, notes, confidence, learningState } = message;

  let problem = getProblemBySlug(slug);
  if (!problem && number) {
    problem = getProblemById(`lc-${number}`);
  }

  const problemId = problem ? problem.id : `lc-${number || slug}`;
  const settings = await getSettings();

  // 1. Record attempt
  const attempt: AttemptRecord = {
    id: `att-${problemId}-${Date.now()}`,
    problemId,
    timestamp: Date.now(),
    result: 'ACCEPTED',
    language: language || 'C++',
    code: code || '',
    runtimeMs,
    memoryMb,
    solveTimeSeconds: solveTimeSeconds || 0,
    confidence: confidence || 4,
    neededHint: learningState === 'SOLVED_WITH_HINT',
    neededSolution: learningState === 'SOLVED_WITH_SOLUTION',
    canExplain: true,
    canCodeFromScratch: true,
    submissionId,
    notes,
  };
  await recordAttempt(attempt);

  // 2. Update problem progress
  const existingProg = await getProblemProgress(problemId);
  const updatedProg: ProblemProgress = {
    problemId,
    leetcodeNumber: problem ? problem.leetcodeNumber : (number || 0),
    slug: problem ? problem.slug : slug,
    status: learningState || 'SOLVED_INDEPENDENTLY',
    firstAttemptDate: existingProg?.firstAttemptDate || new Date().toISOString().slice(0, 10),
    lastAttemptDate: new Date().toISOString().slice(0, 10),
    attemptCount: (existingProg?.attemptCount || 0) + 1,
    accepted: true,
    neededHint: learningState === 'SOLVED_WITH_HINT',
    neededSolution: learningState === 'SOLVED_WITH_SOLUTION',
    solveTimeSeconds: (existingProg?.solveTimeSeconds || 0) + (solveTimeSeconds || 0),
    confidence: confidence || 4,
    canExplain: true,
    canCodeFromScratch: true,
    forgotPattern: learningState === 'FORGOT_PATTERN',
    notes: notes || existingProg?.notes || '',
    lastSubmissionId: submissionId,
    lastRuntimeMs: runtimeMs,
    lastMemoryMb: memoryMb,
    githubSyncStatus: 'PENDING',
  };
  await saveProblemProgress(updatedProg);

  // 3. Create Spaced Repetition Review
  const review = computeNextReview({
    problemId,
    currentState: updatedProg.status,
    result: 'ACCEPTED',
    confidence: updatedProg.confidence,
    neededHint: updatedProg.neededHint,
    neededSolution: updatedProg.neededSolution,
    canExplain: updatedProg.canExplain,
    canCodeFromScratch: updatedProg.canCodeFromScratch,
  });
  await saveReview(review);

  // 4. Enqueue GitHub Sync Job if code is available and meets language policy
  let githubStatus: 'NONE' | 'PENDING' | 'SYNCED' | 'FAILED' = 'NONE';
  const isCpp = (language || '').toLowerCase().includes('c++') || (language || '').toLowerCase() === 'cpp';
  const shouldUpload = isCpp || settings.github.autoUploadNonCpp;

  if (settings.github.connected && settings.github.autoUpload && shouldUpload && code && code.trim().length > 0) {
    if (problem) {
      const paths = generateProblemPath(problem, settings.github.rootDir);
      const job: GithubSyncJob = {
        id: `gh-job-${problemId}-${Date.now()}`,
        problemId,
        submissionId,
        status: 'PENDING',
        solutionCode: code,
        language: language || 'C++',
        runtimeMs,
        memoryMb,
        attempts: 0,
        filePath: paths.codePath,
        createdAt: Date.now(),
      };
      await enqueueGithubJob(job);
      githubStatus = 'PENDING';

      // Trigger background upload
      processSyncQueue().then((res) => {
        if (res.processed > 0) {
          updateBadge();
        }
      });
    }
  }

  // 5. Chrome Notification
  if (settings.notificationsEnabled && chrome.notifications) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-48.png',
      title: 'Problem Solved! 🎉',
      message: `Accepted: #${problem ? problem.leetcodeNumber : number} ${problem ? problem.title : title}`,
    });
  }

  await updateBadge();
  return { success: true, progress: updatedProg, githubStatus };
}

async function handleLeetCodeRejected(message: any) {
  const { slug, result, runtimeMs, memoryMb } = message;
  const problem = getProblemBySlug(slug);
  const problemId = problem ? problem.id : `lc-${slug}`;

  const attempt: AttemptRecord = {
    id: `att-${problemId}-${Date.now()}`,
    problemId,
    timestamp: Date.now(),
    result: result || 'WRONG_ANSWER',
    language: 'C++',
    code: '',
    runtimeMs,
    memoryMb,
    solveTimeSeconds: 0,
    confidence: 2,
    neededHint: false,
    neededSolution: false,
    canExplain: false,
    canCodeFromScratch: false,
  };
  await recordAttempt(attempt);

  const existingProg = await getProblemProgress(problemId);
  if (existingProg) {
    existingProg.attemptCount += 1;
    existingProg.lastAttemptDate = new Date().toISOString().slice(0, 10);
    await saveProblemProgress(existingProg);
  }

  return { success: true };
}

async function updateBadge() {
  try {
    const dueReviews = await getReviewsDue();
    const count = dueReviews.length;
    if (count > 0) {
      await chrome.action.setBadgeText({ text: String(count) });
      await chrome.action.setBadgeBackgroundColor({ color: '#f59e0b' }); // Amber
    } else {
      await chrome.action.setBadgeText({ text: '' });
    }
  } catch (err) {
    // Ignore in non-extension contexts
  }
}
