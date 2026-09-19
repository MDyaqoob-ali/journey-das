import React from 'react';
import { createRoot } from 'react-dom/client';
import { extractProblemInfo, type ExtractedProblemInfo } from './adapters/problem-adapter';
import { extractSubmittedSolution } from './adapters/solution-adapter';
import { SubmissionObserver, type SubmissionVerdict } from './adapters/submission-adapter';
import { FloatingTracker } from './ui/FloatingTracker';
import type { AttemptResult, LearningState } from '../../types/db';

let problemInfo: ExtractedProblemInfo | null = null;
let timerSeconds = 0;
let timerState: 'RUNNING' | 'PAUSED' | 'IDLE' = 'IDLE';
let timerInterval: any = null;
let currentStatus: LearningState = 'NOT_STARTED';
let githubSyncStatus: 'NONE' | 'PENDING' | 'SYNCED' | 'FAILED' = 'NONE';
let root: any = null;

function init() {
  problemInfo = extractProblemInfo();
  if (!problemInfo) {
    // Retry after short delay in case of client-side navigation
    setTimeout(init, 1000);
    return;
  }

  // Inject host container into DOM
  let container = document.getElementById('dsa-tracker-host');
  if (!container) {
    container = document.createElement('div');
    container.id = 'dsa-tracker-host';
    document.body.appendChild(container);
  }

  root = createRoot(container);
  renderHUD();

  // Query background service worker for saved problem progress & active session
  fetchInitialState();

  // Start observing submissions
  const submissionObserver = new SubmissionObserver(handleSubmissionVerdict);
  submissionObserver.start();
}

function renderHUD() {
  if (!root || !problemInfo) return;

  root.render(
    React.createElement(FloatingTracker, {
      problemInfo,
      onTimerAction: handleTimerAction,
      onSubmitResult: handleManualResult,
      onManualGithubUpload: handleManualGithubUpload,
      timerSeconds,
      timerState,
      currentStatus,
      githubSyncStatus,
    })
  );
}

function handleTimerAction(action: 'START' | 'PAUSE' | 'RESUME' | 'RESET') {
  if (action === 'START' || action === 'RESUME') {
    timerState = 'RUNNING';
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timerSeconds++;
      renderHUD();
    }, 1000);
    if (problemInfo?.curriculumProblem) {
      chrome.runtime.sendMessage({
        type: 'START_SESSION',
        problemId: problemInfo.curriculumProblem.id,
      });
    }
  } else if (action === 'PAUSE') {
    timerState = 'PAUSED';
    clearInterval(timerInterval);
    if (problemInfo?.curriculumProblem) {
      chrome.runtime.sendMessage({
        type: 'PAUSE_SESSION',
        problemId: problemInfo.curriculumProblem.id,
      });
    }
  } else if (action === 'RESET') {
    timerState = 'IDLE';
    timerSeconds = 0;
    clearInterval(timerInterval);
  }
  renderHUD();
}

function handleSubmissionVerdict(verdict: SubmissionVerdict) {
  if (verdict.result === 'ACCEPTED') {
    // Stop timer
    handleTimerAction('PAUSE');

    // Extract C++ code
    const extracted = extractSubmittedSolution();
    currentStatus = 'SOLVED_INDEPENDENTLY';
    githubSyncStatus = 'PENDING';
    renderHUD();

    // Notify background service worker
    chrome.runtime.sendMessage({
      type: 'LEETCODE_ACCEPTED',
      slug: problemInfo?.slug,
      number: problemInfo?.number,
      title: problemInfo?.title,
      runtimeMs: verdict.runtimeMs,
      memoryMb: verdict.memoryMb,
      submissionId: verdict.submissionId,
      code: extracted?.code || '',
      language: extracted?.language || 'C++',
      solveTimeSeconds: timerSeconds,
    }, (response) => {
      if (response && response.githubStatus) {
        githubSyncStatus = response.githubStatus;
        renderHUD();
      }
    });
  } else {
    // Record rejected attempt
    chrome.runtime.sendMessage({
      type: 'LEETCODE_REJECTED',
      slug: problemInfo?.slug,
      result: verdict.result,
      runtimeMs: verdict.runtimeMs,
      memoryMb: verdict.memoryMb,
    });
  }
}

function handleManualResult(result: AttemptResult, notes: string, confidence: number, state: LearningState) {
  currentStatus = state;
  renderHUD();

  const extracted = extractSubmittedSolution();

  chrome.runtime.sendMessage({
    type: 'LEETCODE_ACCEPTED',
    slug: problemInfo?.slug,
    number: problemInfo?.number,
    title: problemInfo?.title,
    solveTimeSeconds: timerSeconds,
    notes,
    confidence,
    learningState: state,
    code: extracted?.code || '',
    language: extracted?.language || 'C++',
  });
}

function handleManualGithubUpload(code: string) {
  githubSyncStatus = 'PENDING';
  renderHUD();
  chrome.runtime.sendMessage({
    type: 'TRIGGER_GITHUB_SYNC',
    code,
    slug: problemInfo?.slug,
  });
}

function fetchInitialState() {
  if (!problemInfo) return;
  chrome.runtime.sendMessage({
    type: 'GET_CURRENT_PROBLEM',
    slug: problemInfo.slug,
  }, (response) => {
    if (response) {
      if (response.progress) {
        currentStatus = response.progress.status;
        githubSyncStatus = response.progress.githubSyncStatus || 'NONE';
      }
      if (response.activeSession && response.activeSession.state === 'RUNNING') {
        const elapsed = Math.floor((Date.now() - response.activeSession.startedAt) / 1000);
        timerSeconds = response.activeSession.activeTimeSeconds + elapsed;
        handleTimerAction('RESUME');
      }
      renderHUD();
    }
  });
}

// Start once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
