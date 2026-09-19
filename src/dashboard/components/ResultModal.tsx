import React, { useState } from 'react';
import type { CurriculumProblem } from '../../types/curriculum';
import type { AttemptResult, LearningState } from '../../types/db';
import { X, CheckCircle, HelpCircle, AlertOctagon, Lightbulb, Clock } from 'lucide-react';

interface ResultModalProps {
  problem: CurriculumProblem;
  onClose: () => void;
  onSubmit: (params: {
    result: AttemptResult;
    state: LearningState;
    confidence: number;
    canExplain: boolean;
    canCodeFromScratch: boolean;
    forgotPattern: boolean;
    notes: string;
    solveTimeSeconds: number;
  }) => void;
  initialSeconds?: number;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  problem,
  onClose,
  onSubmit,
  initialSeconds = 0,
}) => {
  const [selectedState, setSelectedState] = useState<LearningState>('SOLVED_INDEPENDENTLY');
  const [confidence, setConfidence] = useState(4);
  const [canExplain, setCanExplain] = useState(true);
  const [canCodeFromScratch, setCanCodeFromScratch] = useState(true);
  const [forgotPattern, setForgotPattern] = useState(false);
  const [notes, setNotes] = useState('');
  const [solveMinutes, setSolveMinutes] = useState(Math.max(1, Math.round(initialSeconds / 60) || 25));

  const stateOptions = [
    {
      state: 'SOLVED_INDEPENDENTLY' as LearningState,
      label: 'Solved Independently',
      desc: 'Derived approach, wrote code, and passed all test cases without assistance.',
      icon: CheckCircle,
      color: 'text-accent-green',
    },
    {
      state: 'SOLVED_WITH_HINT' as LearningState,
      label: 'Needed a Hint',
      desc: 'Looked at one targeted hint to overcome a bottleneck.',
      icon: Lightbulb,
      color: 'text-accent-amber',
    },
    {
      state: 'SOLVED_WITH_SOLUTION' as LearningState,
      label: 'Needed the Solution / Editorial',
      desc: 'Read editorial or solution to understand the recurrence or invariant.',
      icon: HelpCircle,
      color: 'text-amber-500',
    },
    {
      state: 'SOLVED_TOO_SLOWLY' as LearningState,
      label: 'Solved, but too slowly',
      desc: 'Exceeded the recommended time window (e.g., >45 min for Medium).',
      icon: Clock,
      color: 'text-brand-400',
    },
    {
      state: 'FAILED' as LearningState,
      label: 'Failed / Blocked',
      desc: 'Could not pass test cases within target time.',
      icon: AlertOctagon,
      color: 'text-accent-rose',
    },
  ];

  const handleSave = () => {
    const result: AttemptResult = selectedState === 'FAILED' ? 'WRONG_ANSWER' : 'ACCEPTED';
    onSubmit({
      result,
      state: selectedState,
      confidence,
      canExplain,
      canCodeFromScratch,
      forgotPattern,
      notes,
      solveTimeSeconds: solveMinutes * 60,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-900 border border-surface-800 rounded-xl max-w-lg w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-800">
          <div>
            <h3 className="text-base font-bold text-white">Record Problem Attempt</h3>
            <div className="text-xs text-slate-400">
              #{problem.leetcodeNumber} {problem.title} • {problem.difficulty}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-surface-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Outcome Selection */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            How did this attempt go?
          </label>
          <div className="space-y-2">
            {stateOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedState === opt.state;

              return (
                <div
                  key={opt.state}
                  onClick={() => setSelectedState(opt.state)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-brand-950/40 border-brand-500 ring-1 ring-brand-500/50'
                      : 'bg-surface-850 border-surface-800 hover:border-surface-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${opt.color}`} />
                  <div>
                    <div className="text-xs font-bold text-white">{opt.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Checkboxes (Failure Protocol questions) */}
        <div className="mt-4 p-3 bg-surface-850 rounded-lg border border-surface-800 space-y-2.5">
          <div className="text-xs font-semibold text-slate-300">Self-Assessment Protocol</div>
          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={canExplain}
              onChange={(e) => setCanExplain(e.target.checked)}
              className="rounded bg-surface-800 border-surface-700 text-brand-500 focus:ring-0"
            />
            <span>Can you explain the core invariant aloud in 60 seconds?</span>
          </label>
          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={canCodeFromScratch}
              onChange={(e) => setCanCodeFromScratch(e.target.checked)}
              className="rounded bg-surface-800 border-surface-700 text-brand-500 focus:ring-0"
            />
            <span>Can you code this from a blank file without reference?</span>
          </label>
          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={forgotPattern}
              onChange={(e) => setForgotPattern(e.target.checked)}
              className="rounded bg-surface-800 border-surface-700 text-accent-amber focus:ring-0"
            />
            <span>Did you struggle to recognize the pattern initially?</span>
          </label>
        </div>

        {/* Confidence & Time */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Confidence (1 - 5)
            </label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setConfidence(val)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-bold border transition-colors ${
                    confidence === val
                      ? 'bg-brand-600 border-brand-500 text-white'
                      : 'bg-surface-850 border-surface-800 text-slate-300 hover:bg-surface-800'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Active Time (Minutes)
            </label>
            <input
              type="number"
              min="1"
              max="180"
              value={solveMinutes}
              onChange={(e) => setSolveMinutes(parseInt(e.target.value, 10) || 1)}
              className="w-full bg-surface-850 border border-surface-800 rounded-md px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Invariant Notes */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Key Invariant / Lessons Learned
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write the one-sentence recognition trigger or implementation invariant..."
            className="w-full bg-surface-850 border border-surface-800 rounded-md p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 h-20 resize-none"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 bg-surface-800 hover:bg-surface-750 text-slate-300 rounded-lg text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
          >
            Record Attempt & Schedule Review
          </button>
        </div>
      </div>
    </div>
  );
};
