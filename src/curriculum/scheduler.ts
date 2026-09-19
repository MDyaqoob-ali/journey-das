import type { ProblemProgress, ReviewItem } from '../types/db';
import type { StudySettings } from '../types/settings';
import type { CurriculumProblem } from '../types/curriculum';
import { getProblemById, getScheduleForDay, getAllScheduleItems } from './curriculum';

export interface DailyWorkload {
  dayNumber: number;
  weekNumber: number;
  monthNumber: number;
  date: string;
  isRestDay: boolean;
  assignedProblems: CurriculumProblem[];
  dueReviews: { review: ReviewItem; problem: CurriculumProblem }[];
  totalActiveCount: number; // strictly <= 5
  recommendedNext?: {
    problem: CurriculumProblem;
    action: 'START' | 'REVIEW' | 'RETRY';
    reason: string;
  };
}

export function calculateCurrentDayNumber(startDateStr: string, targetDateStr?: string): number {
  const start = new Date(startDateStr);
  const target = targetDateStr ? new Date(targetDateStr) : new Date();

  start.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffMs = target.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // 1-indexed, clamped between 1 and 196
  return Math.max(1, Math.min(196, diffDays + 1));
}

export function buildDailyWorkload(params: {
  dayNumber: number;
  dateStr?: string;
  settings: StudySettings;
  progressMap: Map<string, ProblemProgress>;
  dueReviews: ReviewItem[];
}): DailyWorkload {
  const { dayNumber, dateStr = new Date().toISOString().slice(0, 10), settings, progressMap, dueReviews } = params;

  const weekNumber = Math.ceil(dayNumber / 7);
  const monthNumber = Math.ceil(weekNumber / 4);

  // Check if today is a configured rest day
  const dateObj = new Date(dateStr);
  const dayOfWeek = dateObj.getDay(); // 0 = Sunday
  const isConfiguredRestDay = settings.restDays.includes(dayOfWeek);

  const rawDaySchedule = getScheduleForDay(dayNumber);
  const scheduledProblemIds: string[] = [];

  for (const item of rawDaySchedule) {
    if (item.leetcodeNumber) {
      scheduledProblemIds.push(`lc-${item.leetcodeNumber}`);
    }
  }

  // Retrieve problem details
  const scheduledProblems: CurriculumProblem[] = [];
  for (const id of scheduledProblemIds) {
    const prob = getProblemById(id);
    if (prob) scheduledProblems.push(prob);
  }

  // Separate overdue reviews
  const reviewProblems: { review: ReviewItem; problem: CurriculumProblem }[] = [];
  for (const rev of dueReviews) {
    const prob = getProblemById(rev.problemId);
    if (prob) {
      reviewProblems.push({ review: rev, problem: prob });
    }
  }

  // Workload allocation with hard cap of 5 problems
  const maxCap = Math.min(5, settings.dailyMaxProblems || 5);
  const allocatedAssigned: CurriculumProblem[] = [];
  const allocatedReviews: { review: ReviewItem; problem: CurriculumProblem }[] = [];

  // Prioritize 1-2 overdue reviews first
  let remainingSlots = maxCap;
  for (const revItem of reviewProblems) {
    if (remainingSlots > 0 && allocatedReviews.length < 2) {
      allocatedReviews.push(revItem);
      remainingSlots--;
    }
  }

  // Fill with today's scheduled curriculum problems
  for (const prob of scheduledProblems) {
    if (remainingSlots > 0) {
      allocatedAssigned.push(prob);
      remainingSlots--;
    }
  }

  // If slots remain, allow additional due reviews
  for (const revItem of reviewProblems) {
    if (remainingSlots > 0 && !allocatedReviews.some(r => r.problem.id === revItem.problem.id)) {
      allocatedReviews.push(revItem);
      remainingSlots--;
    }
  }

  const totalActive = allocatedAssigned.length + allocatedReviews.length;

  // Compute "What should I do now?" recommendation
  let recommendedNext: DailyWorkload['recommendedNext'] = undefined;

  // 1. Check for any incomplete assigned problem from today
  for (const prob of allocatedAssigned) {
    const prog = progressMap.get(prob.id);
    if (!prog || (!prog.accepted && prog.status !== 'MASTERED')) {
      recommendedNext = {
        problem: prob,
        action: 'START',
        reason: `Today's assignment: ${prob.title} (${prob.difficulty} - ${prob.patterns.join(', ')})`,
      };
      break;
    }
  }

  // 2. If all today's assignments completed, check top due review
  if (!recommendedNext && allocatedReviews.length > 0) {
    const topReview = allocatedReviews[0];
    recommendedNext = {
      problem: topReview.problem,
      action: 'REVIEW',
      reason: `Overdue revision: ${topReview.problem.title} (${topReview.review.reason})`,
    };
  }

  return {
    dayNumber,
    weekNumber,
    monthNumber,
    date: dateStr,
    isRestDay: isConfiguredRestDay || scheduledProblems.length === 0,
    assignedProblems: allocatedAssigned,
    dueReviews: allocatedReviews,
    totalActiveCount: totalActive,
    recommendedNext,
  };
}

/**
 * Calculates study streak, accounting for configured rest days.
 */
export function calculateStreak(params: {
  completedDates: string[]; // Set of YYYY-MM-DD when at least 1 problem was solved
  restDays: number[]; // e.g. [0] for Sunday
  todayDateStr?: string;
}): { currentStreak: number; longestStreak: number } {
  const { completedDates, restDays, todayDateStr = new Date().toISOString().slice(0, 10) } = params;

  if (completedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dateSet = new Set(completedDates);
  let currentStreak = 0;
  let cursor = new Date(todayDateStr);

  // If today is not completed yet, check if yesterday was completed
  const todayStr = cursor.toISOString().slice(0, 10);
  if (!dateSet.has(todayStr)) {
    // If today is a rest day, streak is still intact from yesterday
    const dayOfWeek = cursor.getDay();
    if (restDays.includes(dayOfWeek)) {
      cursor.setDate(cursor.getDate() - 1);
    } else {
      cursor.setDate(cursor.getDate() - 1);
      const yesterdayStr = cursor.toISOString().slice(0, 10);
      if (!dateSet.has(yesterdayStr)) {
        return { currentStreak: 0, longestStreak: calculateLongestStreak(dateSet, restDays) };
      }
    }
  }

  // Count backwards
  while (true) {
    const str = cursor.toISOString().slice(0, 10);
    const dayOfWeek = cursor.getDay();

    if (dateSet.has(str)) {
      currentStreak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (restDays.includes(dayOfWeek)) {
      // Rest day: does not increment streak, but does not break it
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  const longestStreak = Math.max(currentStreak, calculateLongestStreak(dateSet, restDays));
  return { currentStreak, longestStreak };
}

function calculateLongestStreak(dateSet: Set<string>, restDays: number[]): number {
  if (dateSet.size === 0) return 0;
  const sorted = Array.from(dateSet).sort();
  let maxStreak = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const next = new Date(sorted[i]);
    const diffDays = Math.round((next.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      current++;
    } else if (diffDays === 2 && restDays.includes(new Date(prev.getTime() + 86400000).getDay())) {
      // 1 day gap was a rest day
      current++;
    } else {
      current = 1;
    }
    if (current > maxStreak) {
      maxStreak = current;
    }
  }

  return maxStreak;
}
