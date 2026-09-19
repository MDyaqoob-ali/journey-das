import type { CurriculumProblem } from '../types/curriculum';
import curriculumData from '../data/curriculum.json';
import scheduleData from '../data/schedule.json';

const problems: CurriculumProblem[] = curriculumData as CurriculumProblem[];

const problemById = new Map<string, CurriculumProblem>();
const problemBySlug = new Map<string, CurriculumProblem>();
const problemByNumber = new Map<number, CurriculumProblem>();

for (const p of problems) {
  problemById.set(p.id, p);
  problemBySlug.set(p.slug.toLowerCase(), p);
  problemByNumber.set(p.leetcodeNumber, p);
}

export function getAllProblems(): CurriculumProblem[] {
  return problems;
}

export function getProblemById(id: string): CurriculumProblem | undefined {
  return problemById.get(id);
}

export function getProblemBySlug(slug: string): CurriculumProblem | undefined {
  return problemBySlug.get(slug.toLowerCase().trim());
}

export function getProblemByNumber(num: number): CurriculumProblem | undefined {
  return problemByNumber.get(num);
}

export function getProblemsByWeek(weekNumber: number): CurriculumProblem[] {
  return problems.filter((p) => p.week === weekNumber);
}

export function getProblemsByMonth(monthNumber: number): CurriculumProblem[] {
  return problems.filter((p) => p.month === monthNumber);
}

export function getScheduleForDay(dayNumber: number) {
  return scheduleData.filter((item: any) => item.dayNumber === dayNumber);
}

export function getScheduleForWeek(weekNumber: number) {
  return scheduleData.filter((item: any) => item.weekNumber === weekNumber);
}

export function getAllScheduleItems() {
  return scheduleData;
}
