import React from 'react';
import type { ProblemProgress } from '../../types/db';
import type { CurriculumProblem } from '../../types/curriculum';
import {
  CheckCircle2,
  Clock,
  Flame,
  HelpCircle,
  Lightbulb,
  AlertOctagon,
  Terminal,
  Layers,
  Award,
} from 'lucide-react';

interface OverviewTabProps {
  problems: CurriculumProblem[];
  progressMap: Map<string, ProblemProgress>;
  streak: { currentStreak: number; longestStreak: number };
  interviewCount: number;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  problems,
  progressMap,
  streak,
  interviewCount,
}) => {
  // Aggregate metrics
  let completedCount = 0;
  let hintCount = 0;
  let solutionCount = 0;
  let failedCount = 0;
  const solveTimes: number[] = [];

  const diffTotals = { Easy: 0, Medium: 0, Hard: 0 };
  const diffSolved = { Easy: 0, Medium: 0, Hard: 0 };

  const monthTotals: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  const monthSolved: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

  for (const p of problems) {
    diffTotals[p.difficulty]++;
    monthTotals[p.month] = (monthTotals[p.month] || 0) + 1;

    const prog = progressMap.get(p.id);
    if (prog?.accepted) {
      completedCount++;
      diffSolved[p.difficulty]++;
      monthSolved[p.month] = (monthSolved[p.month] || 0) + 1;
      if (prog.solveTimeSeconds > 0) {
        solveTimes.push(prog.solveTimeSeconds);
      }
    }
    if (prog?.neededHint) hintCount++;
    if (prog?.neededSolution) solutionCount++;
    if (prog?.status === 'FAILED') failedCount++;
  }

  const remainingCount = problems.length - completedCount;
  const overallPercent = Math.round((completedCount / problems.length) * 100);

  // Compute solve time averages
  let avgSolveTime = 0;
  let medianSolveTime = 0;
  if (solveTimes.length > 0) {
    avgSolveTime = Math.round(solveTimes.reduce((a, b) => a + b, 0) / solveTimes.length / 60);
    const sorted = [...solveTimes].sort((a, b) => a - b);
    medianSolveTime = Math.round(sorted[Math.floor(sorted.length / 2)] / 60);
  }

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Overall Completion</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {completedCount} <span className="text-sm font-normal text-slate-400">/ {problems.length}</span>
          </div>
          <div className="text-xs text-brand-400 mt-1 font-semibold">{overallPercent}% of Curriculum</div>
        </div>

        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Current Streak</span>
            <Flame className="w-4 h-4 text-accent-amber" />
          </div>
          <div className="text-2xl font-bold text-white">
            {streak.currentStreak} <span className="text-sm font-normal text-slate-400">days</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">Longest: {streak.longestStreak} days</div>
        </div>

        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Average Solve Time</span>
            <Clock className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {avgSolveTime > 0 ? `${avgSolveTime}m` : '—'}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Median: {medianSolveTime > 0 ? `${medianSolveTime}m` : '—'}
          </div>
        </div>

        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Mock Interviews</span>
            <Terminal className="w-4 h-4 text-accent-purple" />
          </div>
          <div className="text-2xl font-bold text-white">{interviewCount}</div>
          <div className="text-xs text-slate-400 mt-1">Weeks 23–28 Simulations</div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          Difficulty Progression
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['Easy', 'Medium', 'Hard'] as const).map((diff) => {
            const solved = diffSolved[diff];
            const total = diffTotals[diff];
            const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
            const colorClass =
              diff === 'Easy'
                ? 'from-emerald-500 to-emerald-400'
                : diff === 'Medium'
                ? 'from-amber-500 to-amber-400'
                : 'from-rose-500 to-rose-400';

            return (
              <div key={diff} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{diff}</span>
                  <span className="text-slate-400">
                    {solved} / {total} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-surface-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full bg-gradient-to-r ${colorClass} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Month Progression Breakdown */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          7-Month Curriculum Roadmap
        </h3>
        <div className="space-y-4">
          {[
            { m: 1, title: 'Month 1: Foundations (Arrays, Hashing, Two Pointers, Sliding Window, Prefix Sums)' },
            { m: 2, title: 'Month 2: Linear Structures (Intervals, Stacks, Monotonic, Linked Lists, Binary Search)' },
            { m: 3, title: 'Month 3: Search Optimization & DP Foundations (Answer Search, Matrix, 1D/2D DP)' },
            { m: 4, title: 'Month 4: Recursion & Hierarchical Structures (Backtracking, Trees, BST)' },
            { m: 5, title: 'Month 5: Advanced Structures & Graphs (Heaps, Tries, Graphs, DSU, Shortest Paths)' },
            { m: 6, title: 'Month 6: Advanced DP & Mixed Blind Recognition (Interval/Tree DP, Topic-Hidden)' },
            { m: 7, title: 'Month 7: Interview Simulation & OA Readiness (Timed Sets, Mocks, Final Audit)' },
          ].map(({ m, title }) => {
            const solved = monthSolved[m] || 0;
            const total = monthTotals[m] || 0;
            const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

            return (
              <div key={m} className="p-3 bg-surface-850 rounded-lg border border-surface-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{title}</span>
                  <span className="font-mono text-slate-400 font-medium">
                    {solved}/{total} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-surface-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Qualitative Metrics (Objective counts) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="text-xs text-slate-400 font-semibold mb-1">Solved Independently</div>
          <div className="text-xl font-bold text-emerald-400">
            {completedCount - hintCount - solutionCount}
          </div>
        </div>
        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="text-xs text-slate-400 font-semibold mb-1">Needed Hints</div>
          <div className="text-xl font-bold text-amber-400">{hintCount}</div>
        </div>
        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="text-xs text-slate-400 font-semibold mb-1">Needed Solution / Editorial</div>
          <div className="text-xl font-bold text-orange-400">{solutionCount}</div>
        </div>
        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="text-xs text-slate-400 font-semibold mb-1">Active Failure List</div>
          <div className="text-xl font-bold text-rose-400">{failedCount}</div>
        </div>
      </div>
    </div>
  );
};
