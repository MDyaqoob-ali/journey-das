export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ProblemType =
  | 'Learn'
  | 'Reinforce'
  | 'Review'
  | 'Timed'
  | 'Timed / Mixed'
  | 'Blind recognition'
  | 'OA-style'
  | 'Mock interview'
  | 'Weekly checkpoint';

export type ImportanceLevel = 'CORE' | 'HIGH' | 'MEDIUM' | 'OPTIONAL';

export interface CurriculumProblem {
  id: string;
  leetcodeNumber: number;
  title: string;
  slug: string;
  url: string;
  difficulty: Difficulty;
  topic: string;
  patterns: string[];
  month: number;
  week: number;
  day: number;
  type: ProblemType;
  purpose: string;
  learningObjective: string;
  recognitionTriggers: string[];
  commonMistakes: string[];
  interviewVariations: string[];
  estimatedMinutes: number;
  isReview: boolean;
  importance: ImportanceLevel;
}

export interface DayScheduleItem {
  dayNumber: number; // 1 - 196
  weekNumber: number; // 1 - 28
  monthNumber: number; // 1 - 7
  dayOfWeek: number; // 1 (Mon) - 7 (Sun)
  problemIds: string[];
  isRestDay: boolean;
  type: ProblemType;
  goal: string;
  notes?: string;
}

export interface WeekPlan {
  weekNumber: number;
  monthNumber: number;
  title: string;
  goal: string;
  concepts: string[];
  coreProblemIds: string[];
  checkpoint: {
    conceptsToExplain: string[];
    readinessRule: string;
    fallbackRule: string;
  };
}

export interface MonthPlan {
  monthNumber: number;
  weeks: number[];
  title: string;
  skillsExpected: string[];
  assessmentTarget: string;
  remedyAction: string;
}
