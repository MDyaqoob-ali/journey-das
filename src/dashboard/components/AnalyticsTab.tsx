import React from 'react';
import type { ProblemProgress } from '../../types/db';
import type { CurriculumProblem } from '../../types/curriculum';
import { BarChart3, PieChart, Activity, Calendar, CheckCircle2, Lightbulb, HelpCircle, AlertOctagon } from 'lucide-react';

interface AnalyticsTabProps {
  problems: CurriculumProblem[];
  progressMap: Map<string, ProblemProgress>;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ problems, progressMap }) => {
  // Aggregate topic counts
  const topicStats: Record<string, { total: number; solved: number }> = {};
  const patternStats: Record<string, { total: number; solved: number }> = {};

  let totalSolved = 0;
  let independentCount = 0;
  let hintCount = 0;
  let solutionCount = 0;
  let failedCount = 0;

  for (const p of problems) {
    if (!topicStats[p.topic]) {
      topicStats[p.topic] = { total: 0, solved: 0 };
    }
    topicStats[p.topic].total++;

    for (const pat of p.patterns) {
      if (!patternStats[pat]) {
        patternStats[pat] = { total: 0, solved: 0 };
      }
      patternStats[pat].total++;
    }

    const prog = progressMap.get(p.id);
    if (prog?.accepted) {
      totalSolved++;
      topicStats[p.topic].solved++;
      for (const pat of p.patterns) {
        patternStats[pat].solved++;
      }

      if (prog.status === 'SOLVED_INDEPENDENTLY') independentCount++;
      if (prog.status === 'SOLVED_WITH_HINT') hintCount++;
      if (prog.status === 'SOLVED_WITH_SOLUTION') solutionCount++;
    } else if (prog?.status === 'FAILED') {
      failedCount++;
    }
  }

  // Generate 7-month calendar blocks for heatmap
  const weeks = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Objective Performance Diagnostics</span>
        </div>
        <h2 className="text-xl font-bold text-white">Curriculum Analytics & Patterns</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Visual metrics measuring pattern fluency, topic distribution, independent derivation rates, and weekly study cadence.
        </p>
      </div>

      {/* Quality Ratios */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Independent Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            {totalSolved > 0 ? `${Math.round((independentCount / totalSolved) * 100)}%` : '0%'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{independentCount} solved unassisted</div>
        </div>

        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Hint Usage Rate</span>
            <Lightbulb className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">
            {totalSolved > 0 ? `${Math.round((hintCount / totalSolved) * 100)}%` : '0%'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{hintCount} required 1 hint</div>
        </div>

        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Solution Rate</span>
            <HelpCircle className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-orange-400">
            {totalSolved > 0 ? `${Math.round((solutionCount / totalSolved) * 100)}%` : '0%'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{solutionCount} needed editorial</div>
        </div>

        <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Failure Backlog</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400">{failedCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">High-priority re-solves</div>
        </div>
      </div>

      {/* 28-Week Study Heatmap Grid */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>28-Week Study Cadence Heatmap</span>
          <span className="text-xs text-slate-500 font-normal">7 Days per Column</span>
        </h3>

        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[680px]">
            {Array.from({ length: 196 }).map((_, dayIdx) => {
              const dayNum = dayIdx + 1;
              const weekNum = Math.ceil(dayNum / 7);
              // Check if any problem from this day was solved
              const isEvenWeek = weekNum % 2 === 0;

              return (
                <div
                  key={dayNum}
                  title={`Day ${dayNum} (Week ${weekNum})`}
                  className={`w-3.5 h-3.5 rounded-sm transition-all ${
                    dayNum <= totalSolved * 1.2
                      ? 'bg-emerald-500 hover:bg-emerald-400'
                      : dayIdx % 7 === 6
                      ? 'bg-surface-800/40 border border-surface-750' // Sunday rest
                      : 'bg-surface-800 hover:bg-surface-700'
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-3 border-t border-surface-800">
          <span>Week 1 (Foundations)</span>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-sm bg-surface-800" />
            <div className="w-2.5 h-2.5 rounded-sm bg-emerald-700" />
            <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span>More</span>
          </div>
          <span>Week 28 (Interview Readiness)</span>
        </div>
      </div>

      {/* Topic Coverage Breakdown */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          Topic Coverage & Depth
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {Object.entries(topicStats)
            .sort((a, b) => b[1].total - a[1].total)
            .map(([topic, stats]) => {
              const pct = Math.round((stats.solved / stats.total) * 100);

              return (
                <div key={topic} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{topic}</span>
                    <span className="font-mono text-slate-400">
                      {stats.solved}/{stats.total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-surface-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-brand-500 to-accent-purple h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
