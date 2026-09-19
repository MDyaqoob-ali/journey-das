import { describe, it, expect } from 'vitest';
import { generateProblemPath, generateReadmeContent } from '../github/api';
import { getProblemById } from '../curriculum/curriculum';

describe('GitHub Portfolio Integration', () => {
  it('should generate clean, portfolio-friendly file paths', () => {
    const twoSum = getProblemById('lc-1')!;
    const paths = generateProblemPath(twoSum, 'leetcode/');

    expect(paths.codePath).toBe('leetcode/0001-two-sum/solution.cpp');
    expect(paths.readmePath).toBe('leetcode/0001-two-sum/README.md');
  });

  it('should generate structured markdown README with metadata and invariants', () => {
    const twoSum = getProblemById('lc-1')!;
    const readme = generateReadmeContent({
      problem: twoSum,
      runtimeMs: 4,
      memoryMb: 10.5,
      dateStr: '2026-09-20',
    });

    expect(readme).toContain('# [1. Two Sum](https://leetcode.com/problems/two-sum/)');
    expect(readme).toContain('- **Difficulty:** `Easy`');
    expect(readme).toContain('- **Patterns:** `Hashing`');
    expect(readme).toContain('- **Runtime:** `4 ms`');
    expect(readme).toContain('- **Memory:** `10.5 MB`');
    expect(readme).toContain('## Learning Purpose & Invariants');
    expect(readme).toContain('## Recognition Triggers');
  });
});
