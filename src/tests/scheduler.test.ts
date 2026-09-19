import { describe, it, expect } from 'vitest';
import {
  calculateCurrentDayNumber,
  buildDailyWorkload,
  calculateStreak,
} from '../curriculum/scheduler';
import { DEFAULT_SETTINGS } from '../types/settings';
import type { ProblemProgress, ReviewItem } from '../types/db';

describe('Scheduler & Workload Invariants', () => {
  it('should strictly enforce maximum 5 active problems per day even with excessive reviews', () => {
    const mockReviews: ReviewItem[] = [
      { id: 'r1', problemId: 'lc-1', scheduledDate: '2026-09-20', intervalDays: 2, stage: 1, reason: 'Test 1', status: 'DUE' },
      { id: 'r2', problemId: 'lc-217', scheduledDate: '2026-09-20', intervalDays: 2, stage: 1, reason: 'Test 2', status: 'DUE' },
      { id: 'r3', problemId: 'lc-242', scheduledDate: '2026-09-20', intervalDays: 2, stage: 1, reason: 'Test 3', status: 'DUE' },
      { id: 'r4', problemId: 'lc-49', scheduledDate: '2026-09-20', intervalDays: 2, stage: 1, reason: 'Test 4', status: 'DUE' },
      { id: 'r5', problemId: 'lc-347', scheduledDate: '2026-09-20', intervalDays: 2, stage: 1, reason: 'Test 5', status: 'DUE' },
      { id: 'r6', problemId: 'lc-238', scheduledDate: '2026-09-20', intervalDays: 2, stage: 1, reason: 'Test 6', status: 'DUE' },
    ];

    const workload = buildDailyWorkload({
      dayNumber: 1,
      dateStr: '2026-09-20',
      settings: DEFAULT_SETTINGS.study,
      progressMap: new Map(),
      dueReviews: mockReviews,
    });

    expect(workload.totalActiveCount).toBeLessThanOrEqual(5);
    expect(workload.assignedProblems.length + workload.dueReviews.length).toBeLessThanOrEqual(5);
  });

  it('should recommend the first unsolved curriculum problem for today', () => {
    const workload = buildDailyWorkload({
      dayNumber: 1,
      settings: DEFAULT_SETTINGS.study,
      progressMap: new Map(),
      dueReviews: [],
    });

    expect(workload.recommendedNext).toBeDefined();
    expect(workload.recommendedNext?.action).toBe('START');
    expect(workload.recommendedNext?.problem.leetcodeNumber).toBe(1); // Two Sum
  });

  it('should prioritize overdue reviews if today assigned problems are already completed', () => {
    const progressMap = new Map<string, ProblemProgress>();
    // Mark today's problems (Two Sum #1 and Contains Duplicate #217) as completed
    progressMap.set('lc-1', {
      problemId: 'lc-1',
      leetcodeNumber: 1,
      slug: 'two-sum',
      status: 'SOLVED_INDEPENDENTLY',
      attemptCount: 1,
      accepted: true,
      neededHint: false,
      neededSolution: false,
      solveTimeSeconds: 1200,
      confidence: 5,
      canExplain: true,
      canCodeFromScratch: true,
      forgotPattern: false,
      notes: '',
      githubSyncStatus: 'SYNCED',
    });
    progressMap.set('lc-217', {
      problemId: 'lc-217',
      leetcodeNumber: 217,
      slug: 'contains-duplicate',
      status: 'SOLVED_INDEPENDENTLY',
      attemptCount: 1,
      accepted: true,
      neededHint: false,
      neededSolution: false,
      solveTimeSeconds: 900,
      confidence: 5,
      canExplain: true,
      canCodeFromScratch: true,
      forgotPattern: false,
      notes: '',
      githubSyncStatus: 'SYNCED',
    });

    const mockReview: ReviewItem = {
      id: 'rev-3',
      problemId: 'lc-242',
      scheduledDate: '2026-09-19', // overdue
      intervalDays: 2,
      stage: 1,
      reason: 'Short review',
      status: 'DUE',
    };

    const workload = buildDailyWorkload({
      dayNumber: 1,
      settings: DEFAULT_SETTINGS.study,
      progressMap,
      dueReviews: [mockReview],
    });

    expect(workload.recommendedNext).toBeDefined();
    expect(workload.recommendedNext?.action).toBe('REVIEW');
    expect(workload.recommendedNext?.problem.leetcodeNumber).toBe(242);
  });

  it('should preserve streak on designated rest days', () => {
    // Sunday (0) is rest day
    const completedDates = ['2026-09-18', '2026-09-19']; // Fri, Sat
    // 2026-09-20 is Sunday (rest day)
    const result = calculateStreak({
      completedDates,
      restDays: [0], // Sunday
      todayDateStr: '2026-09-20',
    });

    // Streak should still be 2, because today is an active rest day!
    expect(result.currentStreak).toBe(2);
  });
});
