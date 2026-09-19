import { describe, it, expect } from 'vitest';
import stlCatalog from '../data/stl-catalog.json';
import readinessChecklist from '../data/readiness-checklist.json';
import monthlyAssessments from '../data/monthly-assessments.json';

describe('STL Catalog, Readiness Checklist & Milestone Assessments', () => {
  it('should contain all essential C++ STL containers and algorithms', () => {
    expect(stlCatalog.length).toBeGreaterThanOrEqual(25);
    const names = stlCatalog.map((c: any) => c.name);

    // Verify critical C++ containers and algorithms
    expect(names).toContain('std::vector');
    expect(names).toContain('std::unordered_map');
    expect(names).toContain('std::priority_queue');
    expect(names).toContain('std::lower_bound');
    expect(names).toContain('std::upper_bound');
    expect(names).toContain('std::sort');
  });

  it('should have properly structured readiness checklist items across all stages', () => {
    const totalItems = readinessChecklist.reduce((acc: number, cat: any) => acc + cat.items.length, 0);
    expect(totalItems).toBeGreaterThanOrEqual(20);

    const categories = readinessChecklist.map((cat: any) => cat.category);
    expect(categories).toContain('DSA Knowledge');
    expect(categories).toContain('Pattern Recognition');
    expect(categories).toContain('C++ Implementation');
    expect(categories).toContain('Complexity Analysis');

    for (const cat of readinessChecklist) {
      expect(cat.items.length).toBeGreaterThan(0);
      for (const item of cat.items) {
        expect(item.id).toBeDefined();
        expect(item.title.length).toBeGreaterThan(5);
      }
    }
  });

  it('should define milestones and assessment criteria for all 7 months', () => {
    expect(monthlyAssessments.length).toBe(7);
    for (let m = 1; m <= 7; m++) {
      const assessment = monthlyAssessments.find((a: any) => a.monthNumber === m);
      expect(assessment).toBeDefined();
      expect(assessment?.title).toBeDefined();
      expect(assessment?.skillsExpected.length).toBeGreaterThan(0);
      expect(assessment?.assessmentTarget).toBeDefined();
      expect(assessment?.remedyAction).toBeDefined();
    }
  });
});
