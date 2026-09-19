import React, { useState } from 'react';
import type { ReviewItem, ProblemProgress, AttemptResult, LearningState } from '../../types/db';
import type { CurriculumProblem } from '../../types/curriculum';
import { ResultModal } from './ResultModal';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Filter,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface RevisionTabProps {
  reviews: ReviewItem[];
  problemsMap: Map<string, CurriculumProblem>;
  progressMap: Map<string, ProblemProgress>;
  onOpenProblem: (url: string) => void;
  onRecordResult: (params: {
    problemId: string;
    result: AttemptResult;
    state: LearningState;
    confidence: number;
    canExplain: boolean;
    canCodeFromScratch: boolean;
    forgotPattern: boolean;
    notes: string;
    solveTimeSeconds: number;
  }) => void;
}

export const RevisionTab: React.FC<RevisionTabProps> = ({
  reviews,
  problemsMap,
  progressMap,
  onOpenProblem,
  onRecordResult,
}) => {
  const [activeFilter, setActiveFilter] = useState<'DUE' | 'OVERDUE' | 'UPCOMING' | 'COMPLETED' | 'ALL'>('DUE');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [modalProblem, setModalProblem] = useState<CurriculumProblem | null>(null);

  const todayStr = new Date().toISOString().slice(0, 10);

  // Categorize reviews
  const categorized = reviews.filter((r) => {
    const prob = problemsMap.get(r.problemId);
    if (!prob) return false;
    if (selectedDifficulty !== 'ALL' && prob.difficulty !== selectedDifficulty) return false;

    if (activeFilter === 'DUE') {
      return r.status === 'DUE' && r.scheduledDate === todayStr;
    }
    if (activeFilter === 'OVERDUE') {
      return r.status === 'DUE' && r.scheduledDate < todayStr;
    }
    if (activeFilter === 'UPCOMING') {
      return r.status === 'DUE' && r.scheduledDate > todayStr;
    }
    if (activeFilter === 'COMPLETED') {
      return r.status === 'COMPLETED';
    }
    return true;
  });

  // Count stats
  const dueCount = reviews.filter((r) => r.status === 'DUE' && r.scheduledDate === todayStr).length;
  const overdueCount = reviews.filter((r) => r.status === 'DUE' && r.scheduledDate < todayStr).length;
  const upcomingCount = reviews.filter((r) => r.status === 'DUE' && r.scheduledDate > todayStr).length;
  const completedCount = reviews.filter((r) => r.status === 'COMPLETED').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Adaptive Spaced Repetition Queue</span>
            </div>
            <h2 className="text-xl font-bold text-white">Revisions & Retention System</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Based on Part 7 of the curriculum: short review (2d), 1-week (7d), 3-week (21d), 1-month (30d), and final mock re-solves.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1.5 bg-surface-850 rounded-lg border border-surface-750 text-center">
              <div className="text-[11px] text-slate-400">Due Today</div>
              <div className="text-base font-bold text-brand-400">{dueCount}</div>
            </div>
            <div className="px-3 py-1.5 bg-surface-850 rounded-lg border border-surface-750 text-center">
              <div className="text-[11px] text-slate-400">Overdue</div>
              <div className="text-base font-bold text-accent-amber">{overdueCount}</div>
            </div>
            <div className="px-3 py-1.5 bg-surface-850 rounded-lg border border-surface-750 text-center">
              <div className="text-[11px] text-slate-400">Upcoming</div>
              <div className="text-base font-bold text-slate-300">{upcomingCount}</div>
            </div>
            <div className="px-3 py-1.5 bg-surface-850 rounded-lg border border-surface-750 text-center">
              <div className="text-[11px] text-slate-400">Completed</div>
              <div className="text-base font-bold text-emerald-400">{completedCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Difficulty Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex space-x-1 bg-surface-900 p-1 rounded-lg border border-surface-800">
          {[
            { id: 'DUE', label: `Due Today (${dueCount})` },
            { id: 'OVERDUE', label: `Overdue (${overdueCount})` },
            { id: 'UPCOMING', label: `Upcoming (${upcomingCount})` },
            { id: 'COMPLETED', label: `Completed (${completedCount})` },
            { id: 'ALL', label: 'All' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeFilter === tab.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-surface-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="bg-surface-900 border border-surface-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
        >
          <option value="ALL">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Revision Items List */}
      <div className="space-y-3">
        {categorized.length === 0 ? (
          <div className="p-8 text-center bg-surface-900/50 border border-surface-800 rounded-xl text-slate-500 text-xs">
            No revision items in this category. Complete daily problems to generate adaptive spaced repetition reviews!
          </div>
        ) : (
          categorized.map((rev) => {
            const prob = problemsMap.get(rev.problemId);
            const prog = progressMap.get(rev.problemId);
            if (!prob) return null;

            const isOverdue = rev.status === 'DUE' && rev.scheduledDate < todayStr;
            const isDueToday = rev.status === 'DUE' && rev.scheduledDate === todayStr;

            return (
              <div
                key={rev.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isOverdue
                    ? 'bg-amber-950/10 border-amber-900/40'
                    : isDueToday
                    ? 'bg-brand-950/20 border-brand-900/40'
                    : 'bg-surface-900 border-surface-800'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-400">
                      #{prob.leetcodeNumber}
                    </span>
                    <span
                      onClick={() => onOpenProblem(prob.url)}
                      className="text-sm font-bold text-white hover:text-brand-300 cursor-pointer flex items-center gap-1"
                    >
                      <span>{prob.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        prob.difficulty === 'Easy'
                          ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/50'
                          : prob.difficulty === 'Medium'
                          ? 'text-amber-400 bg-amber-950/40 border border-amber-900/50'
                          : 'text-rose-400 bg-rose-950/40 border border-rose-900/50'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-800 text-slate-400 border border-surface-700">
                      Stage {rev.stage} ({rev.intervalDays}d interval)
                    </span>
                  </div>

                  <div className="text-xs text-slate-400">
                    <span className="text-slate-500">Scheduled Date:</span> {rev.scheduledDate}{' '}
                    {isOverdue && <span className="text-accent-amber font-semibold">• Overdue</span>}
                    {isDueToday && <span className="text-brand-400 font-semibold">• Due Today</span>}
                  </div>

                  <div className="text-[11px] text-slate-400 font-medium">
                    Reason: <span className="text-slate-300">{rev.reason}</span>
                    {prog?.solveTimeSeconds ? ` • Last solve: ${Math.round(prog.solveTimeSeconds / 60)}m` : ''}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onOpenProblem(prob.url)}
                    className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Re-Solve on LeetCode</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setModalProblem(prob)}
                    className="px-3 py-1.5 bg-surface-800 hover:bg-surface-750 text-slate-200 rounded-lg text-xs font-semibold border border-surface-700"
                  >
                    Log Result
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {modalProblem && (
        <ResultModal
          problem={modalProblem}
          onClose={() => setModalProblem(null)}
          onSubmit={(data) => {
            onRecordResult({
              problemId: modalProblem.id,
              ...data,
            });
          }}
        />
      )}
    </div>
  );
};
