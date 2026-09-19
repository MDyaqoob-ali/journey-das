import React, { useState } from 'react';
import type { ErrorLogEntry } from '../../types/db';
import type { CurriculumProblem } from '../../types/curriculum';
import { AlertCircle, Plus, BookOpen, Bug, Brain, Zap, Clock, ShieldAlert } from 'lucide-react';

interface MistakesTabProps {
  errorLogs: ErrorLogEntry[];
  problemsMap: Map<string, CurriculumProblem>;
  onAddErrorLog: (entry: ErrorLogEntry) => void;
  onOpenProblem: (url: string) => void;
}

export const MistakesTab: React.FC<MistakesTabProps> = ({
  errorLogs,
  problemsMap,
  onAddErrorLog,
  onOpenProblem,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState<string>('');
  const [category, setCategory] = useState<ErrorLogEntry['category']>('IMPLEMENTATION_BUG');
  const [description, setDescription] = useState('');
  const [lessonLearned, setLessonLearned] = useState('');

  const handleSave = () => {
    if (!description.trim()) return;

    const entry: ErrorLogEntry = {
      id: `err-${Date.now()}`,
      problemId: selectedProblemId,
      date: new Date().toISOString().slice(0, 10),
      category,
      description,
      lessonLearned,
    };
    onAddErrorLog(entry);
    setShowAddModal(false);
    setDescription('');
    setLessonLearned('');
  };

  const getCategoryIcon = (cat: ErrorLogEntry['category']) => {
    switch (cat) {
      case 'KNOWLEDGE_GAP':
        return <Brain className="w-4 h-4 text-purple-400" />;
      case 'IMPLEMENTATION_BUG':
        return <Bug className="w-4 h-4 text-rose-400" />;
      case 'EDGE_CASE':
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'TIME_COMPLEXITY':
        return <Clock className="w-4 h-4 text-brand-400" />;
      default:
        return <Zap className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Diagnostic Learning Journal</span>
            </div>
            <h2 className="text-xl font-bold text-white">Mistakes & Error Log Catalog</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Distinguish between knowledge gaps and implementation bugs. Reviewing past mistakes prevents repeating them in interview settings.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Log New Mistake</span>
          </button>
        </div>
      </div>

      {/* Error Logs List */}
      <div className="space-y-3">
        {errorLogs.length === 0 ? (
          <div className="p-8 text-center bg-surface-900/50 border border-surface-800 rounded-xl text-slate-500 text-xs">
            No mistakes logged yet. When an attempt hits a roadblock, click "Log New Mistake" to record the diagnostic insight!
          </div>
        ) : (
          errorLogs.map((entry) => {
            const prob = entry.problemId ? problemsMap.get(entry.problemId) : undefined;

            return (
              <div
                key={entry.id}
                className="p-4 bg-surface-900 border border-surface-800 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(entry.category)}
                    <span className="text-xs font-bold text-white">
                      {entry.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-500">• {entry.date}</span>
                    {prob && (
                      <span
                        onClick={() => onOpenProblem(prob.url)}
                        className="text-xs font-semibold text-brand-400 hover:underline cursor-pointer"
                      >
                        #{prob.leetcodeNumber} {prob.title}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-surface-850 p-2.5 rounded-lg border border-surface-800">
                  <span className="font-semibold text-slate-400">What went wrong:</span> {entry.description}
                </div>

                {entry.lessonLearned && (
                  <div className="text-xs text-emerald-300/90 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/40">
                    <span className="font-semibold text-emerald-400">Key takeaway / Lesson:</span> {entry.lessonLearned}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Mistake Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-900 border border-surface-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white">Log Diagnostic Mistake</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2 text-xs text-white"
              >
                <option value="IMPLEMENTATION_BUG">Implementation Bug (Off-by-one, typing, syntax)</option>
                <option value="KNOWLEDGE_GAP">Knowledge Gap (Unknown formula, algorithm, recurrence)</option>
                <option value="EDGE_CASE">Edge Case Miss (Empty, single element, negative numbers)</option>
                <option value="TIME_COMPLEXITY">Time Complexity Exceeded (TLE, wrong bounds)</option>
                <option value="PATIENCE_FOCUS">Patience / Jumping to Code Too Soon</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Related Problem (Optional)
              </label>
              <select
                value={selectedProblemId}
                onChange={(e) => setSelectedProblemId(e.target.value)}
                className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2 text-xs text-white"
              >
                <option value="">None / General Concept</option>
                {Array.from(problemsMap.values()).map((p) => (
                  <option key={p.id} value={p.id}>
                    #{p.leetcodeNumber} {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                What went wrong?
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the faulty assumption or bug..."
                className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2 text-xs text-white h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                What is the rule or fix for next time?
              </label>
              <textarea
                value={lessonLearned}
                onChange={(e) => setLessonLearned(e.target.value)}
                placeholder="Next time, check if low + (high - low) / 2 prevents overflow..."
                className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2 text-xs text-white h-20 resize-none"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-surface-800 hover:bg-surface-750 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold"
              >
                Save Mistake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
