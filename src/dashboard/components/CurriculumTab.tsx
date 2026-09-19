import React, { useState } from 'react';
import type { CurriculumProblem } from '../../types/curriculum';
import type { ProblemProgress } from '../../types/db';
import {
  Search,
  Filter,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  BookOpen,
  HelpCircle,
  Clock,
} from 'lucide-react';

interface CurriculumTabProps {
  problems: CurriculumProblem[];
  progressMap: Map<string, ProblemProgress>;
  onOpenProblem: (url: string) => void;
  onSelectProblemForModal: (problem: CurriculumProblem) => void;
}

export const CurriculumTab: React.FC<CurriculumTabProps> = ({
  problems,
  progressMap,
  onOpenProblem,
  onSelectProblemForModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));

  const topics = Array.from(new Set(problems.map((p) => p.topic))).sort();

  const toggleWeek = (w: number) => {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(w)) next.delete(w);
      else next.add(w);
      return next;
    });
  };

  // Filter problems
  const filtered = problems.filter((p) => {
    if (selectedDifficulty !== 'ALL' && p.difficulty !== selectedDifficulty) return false;
    if (selectedTopic !== 'ALL' && p.topic !== selectedTopic) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchNum = String(p.leetcodeNumber).includes(q);
      const matchPattern = p.patterns.some((pat) => pat.toLowerCase().includes(q));
      const matchTopic = p.topic.toLowerCase().includes(q);
      if (!matchTitle && !matchNum && !matchPattern && !matchTopic) return false;
    }
    return true;
  });

  // Group by week
  const weeksMap = new Map<number, CurriculumProblem[]>();
  for (let w = 1; w <= 28; w++) {
    weeksMap.set(w, []);
  }
  for (const p of filtered) {
    const list = weeksMap.get(p.week) || [];
    list.push(p);
    weeksMap.set(p.week, list);
  }

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="p-4 bg-surface-900 border border-surface-800 rounded-xl flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by title, # number, pattern, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-surface-850 border border-surface-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-surface-850 border border-surface-750 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
          >
            <option value="ALL">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-surface-850 border border-surface-750 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 max-w-[200px]"
          >
            <option value="ALL">All Topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Weeks Accordion */}
      <div className="space-y-3">
        {Array.from(weeksMap.entries()).map(([weekNum, weekProblems]) => {
          if (weekProblems.length === 0 && (searchQuery || selectedDifficulty !== 'ALL' || selectedTopic !== 'ALL')) {
            return null;
          }

          const isExpanded = expandedWeeks.has(weekNum);
          const monthNum = Math.ceil(weekNum / 4);
          const solvedInWeek = weekProblems.filter((p) => progressMap.get(p.id)?.accepted).length;

          return (
            <div
              key={weekNum}
              className="border border-surface-800 rounded-xl overflow-hidden bg-surface-900 transition-colors"
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleWeek(weekNum)}
                className="p-4 bg-surface-850 hover:bg-surface-800/80 cursor-pointer flex items-center justify-between transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-brand-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  )}
                  <div>
                    <div className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
                      Month {monthNum} • Week {weekNum}
                    </div>
                    <div className="text-sm font-bold text-white">
                      {weekProblems[0]?.topic || `Week ${weekNum} Practice & Simulation`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-xs text-slate-400 font-medium">
                    {solvedInWeek} / {weekProblems.length} Solved
                  </div>
                  <div className="w-20 bg-surface-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-brand-500 h-1.5 rounded-full"
                      style={{
                        width: `${
                          weekProblems.length > 0 ? (solvedInWeek / weekProblems.length) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="p-4 border-t border-surface-800 divide-y divide-surface-800/60">
                  {weekProblems.length === 0 ? (
                    <div className="py-4 text-center text-xs text-slate-500">
                      No matching problems found for current filters.
                    </div>
                  ) : (
                    weekProblems.map((prob) => {
                      const prog = progressMap.get(prob.id);
                      const isSolved = prog?.accepted;

                      return (
                        <div
                          key={prob.id}
                          className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {isSolved ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-600" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-slate-400">
                                  #{prob.leetcodeNumber}
                                </span>
                                <span
                                  onClick={() => onOpenProblem(prob.url)}
                                  className="text-sm font-bold text-white hover:text-brand-300 cursor-pointer flex items-center gap-1"
                                >
                                  <span>{prob.title}</span>
                                  <ExternalLink className="w-3 h-3 text-slate-500" />
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
                              </div>
                              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                                {prob.purpose}
                              </p>
                              <div className="text-[11px] text-brand-400/80 mt-1">
                                Pattern: {prob.patterns.join(', ')}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                            <button
                              onClick={() => onOpenProblem(prob.url)}
                              className="px-2.5 py-1.5 bg-surface-800 hover:bg-surface-750 text-slate-200 rounded text-xs font-semibold flex items-center gap-1 border border-surface-700"
                            >
                              <span>LeetCode</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </button>
                            <button
                              onClick={() => onSelectProblemForModal(prob)}
                              className="px-2.5 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded text-xs font-semibold"
                            >
                              {isSolved ? 'Log Re-Solve' : 'Mark Done'}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
