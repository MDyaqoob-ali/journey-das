import { describe, it, expect } from 'vitest';
import { getProblemBySlug } from '../curriculum/curriculum';

describe('LeetCode Adapters & Matching', () => {
  it('should reliably match LeetCode slugs to curriculum catalog', () => {
    const p1 = getProblemBySlug('two-sum');
    expect(p1).toBeDefined();
    expect(p1?.leetcodeNumber).toBe(1);

    const p2 = getProblemBySlug('trapping-rain-water');
    expect(p2).toBeDefined();
    expect(p2?.leetcodeNumber).toBe(42);
    expect(p2?.difficulty).toBe('Hard');

    const p3 = getProblemBySlug('coin-change');
    expect(p3).toBeDefined();
    expect(p3?.leetcodeNumber).toBe(322);
    expect(p3?.patterns).toContain('1D DP');
  });

  it('should handle case-insensitivity and whitespace in slugs', () => {
    const match = getProblemBySlug('  TWO-SUM  ');
    expect(match).toBeDefined();
    expect(match?.leetcodeNumber).toBe(1);
  });
});
