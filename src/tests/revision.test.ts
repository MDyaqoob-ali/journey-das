import { describe, it, expect } from 'vitest';
import { computeNextReview, addDays } from '../curriculum/revision';

describe('Spaced Repetition & Failure Protocol', () => {
  it('should correctly schedule high-priority 24h re-solve on failed attempt', () => {
    const review = computeNextReview({
      problemId: 'lc-42',
      currentState: 'FAILED',
      result: 'WRONG_ANSWER',
      confidence: 1,
      neededHint: true,
      neededSolution: true,
      canExplain: false,
      canCodeFromScratch: false,
      todayDate: '2026-09-20',
    });

    expect(review.intervalDays).toBe(1);
    expect(review.scheduledDate).toBe('2026-09-21');
    expect(review.reason).toContain('high-priority re-solve');
  });

  it('should schedule 48h re-solve when solution editorial was needed', () => {
    const review = computeNextReview({
      problemId: 'lc-15',
      currentState: 'SOLVED_WITH_SOLUTION',
      result: 'ACCEPTED',
      confidence: 2,
      neededHint: false,
      neededSolution: true,
      canExplain: true,
      canCodeFromScratch: false,
      todayDate: '2026-09-20',
    });

    expect(review.intervalDays).toBe(2);
    expect(review.scheduledDate).toBe('2026-09-22');
    expect(review.reason).toContain('Needed editorial solution');
  });

  it('should advance to next spaced repetition stage on strong independent solve', () => {
    const review = computeNextReview({
      problemId: 'lc-1',
      currentState: 'SOLVED_INDEPENDENTLY',
      result: 'ACCEPTED',
      confidence: 5,
      neededHint: false,
      neededSolution: false,
      canExplain: true,
      canCodeFromScratch: true,
      currentStage: 0,
      todayDate: '2026-09-20',
    });

    // Stage 0 -> Stage 1 (7 days)
    expect(review.intervalDays).toBe(7);
    expect(review.scheduledDate).toBe('2026-09-27');
    expect(review.reason).toContain('Spaced Repetition');
  });

  it('should correctly calculate future dates with addDays', () => {
    expect(addDays('2026-09-20', 1)).toBe('2026-09-21');
    expect(addDays('2026-09-20', 7)).toBe('2026-09-27');
    expect(addDays('2026-09-20', 21)).toBe('2026-10-11');
  });
});
