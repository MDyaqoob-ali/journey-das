import React, { useState } from 'react';
import type { DailyWorkload } from '../../curriculum/scheduler';
import type { ProblemProgress, AttemptResult, LearningState } from '../../types/db';
import type { CurriculumProblem } from '../../types/curriculum';
import { ResultModal } from './ResultModal';
import {
  ExternalLink,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Calendar,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface TodayTabProps {
  workload: DailyWorkload;
  progressMap: Map<string, ProblemProgress>;
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
  onOpenProblem: (url: string) => void;
}

export const TodayTab: React.FC<TodayTabProps> = ({
  workload,
  progressMap,
  onRecordResult,
  onOpenProblem,
}) => {
  const [modalProblem, setModalProblem] = useState<CurriculumProblem | null>(null);
  const [revealedPatterns, setRevealedPatterns] = useState<Set<string>>(new Set());
  const [activeTimers, setActiveTimers] = useState<Record<string, number>>({});
  const [timerRunning, setTimerRunning] = useState<Record<string, boolean>>({});

  // Timer tick effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimers((prev) => {
        const next = { ...prev };
        let changed = false;
        for (const [id, isRunning] of Object.entries(timerRunning)) {
          if (isRunning) {
            next[id] = (next[id] || 0) + 1;
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const toggleTimer = (problemId: string) => {
    setTimerRunning((prev) => ({
      ...prev,
      [problemId]: !prev[problemId],
    }));
  };

  const toggleRevealPattern = (problemId: string) => {
    setRevealedPatterns((prev) => {
      const next = new Set(prev);
      if (next.has(problemId)) next.delete(problemId);
      else next.add(problemId);
      return next;
    });
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isInterviewPhase = workload.weekNumber >= 23;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-surface-900 via-surface-850 to-surface-900 border border-surface-800 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Today's Training • Day {workload.dayNumber} of 196</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Month {workload.monthNumber}, Week {workload.weekNumber}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Daily Goal: Complete {workload.assignedProblems.length} targeted problem{workload.assignedProblems.length !== 1 ? 's' : ''} + {workload.dueReviews.length} revision{workload.dueReviews.length !== 1 ? 's' : ''}. Maximum 5 problems/day hard cap strictly enforced.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-surface-800 rounded-lg border border-surface-700 text-center">
              <div className="text-xs text-slate-400">Assigned</div>
              <div className="text-lg font-bold text-white">{workload.assignedProblems.length}</div>
            </div>
            <div className="px-4 py-2 bg-surface-800 rounded-lg border border-surface-700 text-center">
              <div className="text-xs text-slate-400">Revisions Due</div>
              <div className="text-lg font-bold text-accent-amber">{workload.dueReviews.length}</div>
            </div>
            <div className="px-4 py-2 bg-surface-800 rounded-lg border border-surface-700 text-center">
              <div className="text-xs text-slate-400">Daily Cap</div>
              <div className="text-lg font-bold text-brand-400">5 Max</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest Day Notice if applicable */}
      {workload.isRestDay && (
        <div className="p-4 bg-blue-950/30 border border-blue-900/50 rounded-xl flex items-center gap-3 text-blue-200">
          <Clock className="w-5 h-5 text-blue-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold">Scheduled Recovery / Rest Day:</span> No new core problems required today. Review your notes, recharge, or clear overdue revisions at a relaxed pace.
          </div>
        </div>
      )}

      {/* Assigned Problems List */}
      <div>
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Today's Core Problems</span>
          <span className="text-xs text-slate-500 font-normal">Click problem card or Solve to navigate directly to LeetCode</span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {workload.assignedProblems.map((prob) => {
            const prog = progressMap.get(prob.id);
            const isSolved = prog?.accepted;
            const isRunning = !!timerRunning[prob.id];
            const currentSeconds = activeTimers[prob.id] || 0;
            const patternRevealed = revealedPatterns.has(prob.id) || !isInterviewPhase;

            return (
              <div
                key={prob.id}
                className={`p-5 rounded-xl border transition-all ${
                  isSolved
                    ? 'bg-surface-900/60 border-surface-800'
                    : 'bg-surface-900 border-surface-750 hover:border-brand-500/50 shadow-md'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Problem info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-bold text-brand-400">
                        #{prob.leetcodeNumber}
                      </span>
                      <h4
                        onClick={() => onOpenProblem(prob.url)}
                        className="text-base font-bold text-white hover:text-brand-300 cursor-pointer flex items-center gap-1.5 transition-colors"
                      >
                        <span>{prob.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      </h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-semibold ${
                          prob.difficulty === 'Easy'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : prob.difficulty === 'Medium'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-surface-800 text-slate-400 border border-surface-700">
                        {prob.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                      {prob.purpose}
                    </p>

                    {/* Pattern display with blind recognition toggle */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-500 font-medium">Pattern:</span>
                      {patternRevealed ? (
                        <span className="text-brand-300 font-medium bg-brand-950/40 px-2 py-0.5 rounded border border-brand-900/50">
                          {prob.patterns.join(', ')}
                        </span>
                      ) : (
                        <button
                          onClick={() => toggleRevealPattern(prob.id)}
                          className="flex items-center gap-1 text-slate-400 hover:text-slate-200 bg-surface-800 px-2 py-0.5 rounded border border-surface-700 transition-colors"
                        >
                          <Eye className="w-3 h-3 text-brand-400" />
                          <span>Hidden (Click to Reveal)</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right: Controls & Status */}
                  <div className="flex flex-wrap lg:flex-col items-end gap-3 shrink-0">
                    {/* Timer */}
                    <div className="flex items-center gap-2 bg-surface-950 px-3 py-1.5 rounded-lg border border-surface-800">
                      <span className="font-mono text-sm font-bold text-brand-400">
                        {formatTimer(currentSeconds)}
                      </span>
                      <button
                        onClick={() => toggleTimer(prob.id)}
                        className={`p-1 rounded-md transition-colors ${
                          isRunning
                            ? 'bg-accent-amber/20 text-accent-amber hover:bg-accent-amber/30'
                            : 'bg-brand-500/20 text-brand-400 hover:bg-brand-500/30'
                        }`}
                        title={isRunning ? 'Pause Timer' : 'Start Timer'}
                      >
                        {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenProblem(prob.url)}
                        className="px-3 py-1.5 bg-surface-800 hover:bg-surface-750 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-surface-700 transition-colors"
                      >
                        <span>Open LeetCode</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setModalProblem(prob)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          isSolved
                            ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-950/60'
                            : 'bg-brand-600 hover:bg-brand-500 text-white shadow-sm'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isSolved ? 'Update Result' : 'Mark Complete'}</span>
                      </button>
                    </div>

                    {/* Status indicator */}
                    {isSolved && (
                      <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <span>✓ Solved ({prog?.status.replace(/_/g, ' ')})</span>
                        {prog?.githubSyncStatus === 'SYNCED' && (
                          <span className="text-slate-400">• GitHub Synced</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Due Reviews Section */}
      {workload.dueReviews.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-bold text-accent-amber uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Spaced Repetition Revisions Due ({workload.dueReviews.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workload.dueReviews.map(({ review, problem }) => (
              <div
                key={review.id}
                className="p-4 bg-amber-950/10 border border-amber-900/30 rounded-xl flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      #{problem.leetcodeNumber}
                    </span>
                    <span className="text-sm font-bold text-white">{problem.title}</span>
                  </div>
                  <div className="text-[11px] text-amber-300/80 mt-1">
                    {review.reason} • Stage {review.stage}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenProblem(problem.url)}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-black rounded-lg text-xs font-bold transition-colors"
                  >
                    Re-Solve
                  </button>
                  <button
                    onClick={() => setModalProblem(problem)}
                    className="px-2.5 py-1.5 bg-surface-800 hover:bg-surface-750 text-slate-300 rounded-lg text-xs font-semibold border border-surface-700"
                    title="Record Review Result"
                  >
                    Log
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result Modal */}
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
          initialSeconds={activeTimers[modalProblem.id] || 0}
        />
      )}
    </div>
  );
};
