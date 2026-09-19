import { describe, it, expect } from 'vitest';
import { getAllProblems, getProblemById, getProblemBySlug, getProblemByNumber } from '../curriculum/curriculum';
import curriculumData from '../data/curriculum.json';
import scheduleData from '../data/schedule.json';

describe('Curriculum Dataset Verification', () => {
  it('should contain exactly 176 unique core problems', () => {
    const problems = getAllProblems();
    expect(problems.length).toBe(176);

    const ids = new Set(problems.map((p) => p.id));
    expect(ids.size).toBe(176);

    const numbers = new Set(problems.map((p) => p.leetcodeNumber));
    expect(numbers.size).toBe(176);
  });

  it('should match the authoritative difficulty distribution (35 Easy, 118 Medium, 23 Hard)', () => {
    const problems = getAllProblems();
    const counts = { Easy: 0, Medium: 0, Hard: 0 };
    for (const p of problems) {
      counts[p.difficulty]++;
    }

    expect(counts.Easy).toBe(35);
    expect(counts.Medium).toBe(118);
    expect(counts.Hard).toBe(23);
  });

  it('should have valid canonical LeetCode URLs for every problem', () => {
    const problems = getAllProblems();
    for (const p of problems) {
      expect(p.url).toMatch(/^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/);
      expect(p.slug.length).toBeGreaterThan(0);
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.patterns.length).toBeGreaterThan(0);
      expect(p.purpose.length).toBeGreaterThan(10);
    }
  });

  it('should correctly lookup problems by ID, slug, and number', () => {
    const twoSum = getProblemById('lc-1');
    expect(twoSum).toBeDefined();
    expect(twoSum?.title).toBe('Two Sum');

    const bySlug = getProblemBySlug('two-sum');
    expect(bySlug).toBeDefined();
    expect(bySlug?.leetcodeNumber).toBe(1);

    const byNum = getProblemByNumber(1);
    expect(byNum).toBeDefined();
    expect(byNum?.slug).toBe('two-sum');
  });

  it('should have schedule entries spanning 28 weeks', () => {
    expect(scheduleData.length).toBeGreaterThanOrEqual(196);
    const weeks = new Set(scheduleData.map((s: any) => s.weekNumber));
    expect(weeks.size).toBe(28);
  });
});
