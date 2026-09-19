import type { AttemptResult, LearningState, ReviewItem } from '../types/db';

/**
 * Standard curriculum spaced repetition intervals (in days):
 * Stage 1: Short review (2 days)
 * Stage 2: 1-week review (7 days)
 * Stage 3: 2-3 week review (21 days)
 * Stage 4: 1-month review (30 days)
 * Stage 5: Final interview mock (60 days)
 */
const STANDARD_INTERVALS = [2, 7, 21, 30, 60];

export function computeNextReview(params: {
  problemId: string;
  currentState: LearningState;
  result: AttemptResult;
  confidence: number; // 1-5
  neededHint: boolean;
  neededSolution: boolean;
  canExplain: boolean;
  canCodeFromScratch: boolean;
  currentStage?: number;
  todayDate?: string;
}): ReviewItem {
  const {
    problemId,
    currentState,
    result,
    confidence,
    neededHint,
    neededSolution,
    canExplain,
    canCodeFromScratch,
    currentStage = 0,
    todayDate = new Date().toISOString().slice(0, 10),
  } = params;

  let intervalDays = 2;
  let nextStage = currentStage;
  let reason = 'Initial Short Review';

  if (result !== 'ACCEPTED' || currentState === 'FAILED') {
    // Failure protocol: re-solve next day with high priority
    intervalDays = 1;
    nextStage = Math.max(0, currentStage - 1);
    reason = 'Failed attempt: high-priority re-solve within 24h';
  } else if (neededSolution || currentState === 'SOLVED_WITH_SOLUTION') {
    // Re-solve in 2-3 days without notes
    intervalDays = 2;
    nextStage = 1;
    reason = 'Needed editorial solution: re-solve without notes';
  } else if (neededHint || currentState === 'SOLVED_WITH_HINT') {
    // Re-solve within 48h
    intervalDays = 2;
    nextStage = Math.max(1, currentStage);
    reason = 'Needed hint: re-solve within 48 hours';
  } else if (currentState === 'SOLVED_TOO_SLOWLY') {
    intervalDays = 3;
    nextStage = currentStage;
    reason = 'Solved too slowly: timed re-attempt';
  } else if (currentState === 'FORGOT_PATTERN') {
    intervalDays = 2;
    nextStage = 1;
    reason = 'Forgot pattern: re-solve with pattern hidden';
  } else if (result === 'ACCEPTED' && confidence >= 4 && canExplain && canCodeFromScratch) {
    // Strong independent solve: advance to next spaced repetition stage
    nextStage = Math.min(STANDARD_INTERVALS.length - 1, currentStage + 1);
    intervalDays = STANDARD_INTERVALS[nextStage];
    reason = `Spaced Repetition Stage ${nextStage + 1} (${intervalDays} days)`;
  } else {
    // Default moderate confidence: 3 days review
    intervalDays = 3;
    nextStage = Math.max(1, currentStage);
    reason = 'Moderate confidence review';
  }

  const scheduledDate = addDays(todayDate, intervalDays);

  return {
    id: `rev-${problemId}-${Date.now()}`,
    problemId,
    scheduledDate,
    intervalDays,
    stage: nextStage + 1,
    reason,
    status: 'DUE',
  };
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
