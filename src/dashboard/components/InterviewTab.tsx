import React, { useState, useEffect } from 'react';
import type { CurriculumProblem } from '../../types/curriculum';
import type { InterviewSessionRecord } from '../../types/db';
import {
  Terminal,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  Award,
  Clock,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

interface InterviewTabProps {
  problems: CurriculumProblem[];
  interviewHistory: InterviewSessionRecord[];
  onSaveInterview: (session: InterviewSessionRecord) => void;
  onOpenProblem: (url: string) => void;
}

export const InterviewTab: React.FC<InterviewTabProps> = ({
  problems,
  interviewHistory,
  onSaveInterview,
  onOpenProblem,
}) => {
  const [selectedProblem, setSelectedProblem] = useState<CurriculumProblem>(problems[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Blind recognition toggles
  const [patternRevealed, setPatternRevealed] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(false);
  const [variationsRevealed, setVariationsRevealed] = useState(false);

  // Assessment fields
  const [timeToApproach, setTimeToApproach] = useState<number | null>(null);
  const [complexityExplained, setComplexityExplained] = useState(false);
  const [edgeCasesTested, setEdgeCasesTested] = useState(false);
  const [followUpSolved, setFollowUpSolved] = useState(false);
  const [communicationScore, setCommunicationScore] = useState(4);
  const [interviewNotes, setInterviewNotes] = useState('');

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleStartInterview = (prob?: CurriculumProblem) => {
    const target = prob || problems[Math.floor(Math.random() * problems.length)];
    setSelectedProblem(target);
    setIsSimulating(true);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setPatternRevealed(false);
    setHintsRevealed(false);
    setVariationsRevealed(false);
    setTimeToApproach(null);
    setComplexityExplained(false);
    setEdgeCasesTested(false);
    setFollowUpSolved(false);
    setInterviewNotes('');
  };

  const handleMarkFirstApproach = () => {
    setTimeToApproach(timerSeconds);
  };

  const handleFinishInterview = (completed: boolean) => {
    setIsTimerRunning(false);
    const session: InterviewSessionRecord = {
      id: `interview-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      durationMinutes: Math.max(1, Math.round(timerSeconds / 60)),
      problemIds: [selectedProblem.id],
      notes: interviewNotes,
      timeToApproachSeconds: timeToApproach || timerSeconds,
      complexityExplained,
      communicationScore,
      edgeCasesCovered: edgeCasesTested,
      followUpSolved,
      completed,
    };
    onSaveInterview(session);
    setIsSimulating(false);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-purple-950/40 via-surface-900 to-surface-850 border border-purple-900/40 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-accent-purple uppercase tracking-wider mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Interview Simulation Environment</span>
            </div>
            <h2 className="text-xl font-bold text-white">Blind Pattern Recognition & Mock Testing</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Simulates real technical interview conditions: topic labels and patterns are strictly hidden. Practice verbalizing assumptions, stating invariants, testing edge cases, and answering follow-ups.
            </p>
          </div>

          {!isSimulating ? (
            <div className="flex gap-2">
              <button
                onClick={() => handleStartInterview()}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-purple-900/30 flex items-center gap-2 transition-all"
              >
                <Play className="w-4 h-4" />
                <span>Start Random Mock Simulation</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="font-mono text-2xl font-bold text-brand-400 bg-surface-950 px-4 py-2 rounded-lg border border-surface-800">
                {formatTimer(timerSeconds)}
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-2 bg-surface-800 hover:bg-surface-750 text-white rounded-lg border border-surface-700"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active Simulation View */}
      {isSimulating ? (
        <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl space-y-6">
          <div className="flex items-center justify-between border-b border-surface-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-brand-400">
                  #{selectedProblem.leetcodeNumber}
                </span>
                <h3 className="text-xl font-bold text-white">{selectedProblem.title}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-semibold ${
                    selectedProblem.difficulty === 'Easy'
                      ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/50'
                      : selectedProblem.difficulty === 'Medium'
                      ? 'text-amber-400 bg-amber-950/40 border border-amber-900/50'
                      : 'text-rose-400 bg-rose-950/40 border border-rose-900/50'
                  }`}
                >
                  {selectedProblem.difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Target time: {selectedProblem.estimatedMinutes} minutes • Pattern: Hidden
              </p>
            </div>

            <button
              onClick={() => onOpenProblem(selectedProblem.url)}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-colors"
            >
              <span>Solve on LeetCode</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interview Stages / Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-surface-850 rounded-lg border border-surface-800 space-y-2">
              <div className="text-xs font-bold text-slate-300">1. Problem Understanding</div>
              <p className="text-[11px] text-slate-400">
                Restate problem, ask clarifying questions on input bounds, and state brute force.
              </p>
              <button
                onClick={handleMarkFirstApproach}
                disabled={timeToApproach !== null}
                className="w-full py-1.5 bg-surface-800 hover:bg-surface-750 text-brand-400 disabled:text-emerald-400 rounded text-xs font-semibold border border-surface-700 transition-colors"
              >
                {timeToApproach !== null
                  ? `✓ First approach at ${formatTimer(timeToApproach)}`
                  : 'Record Time to Approach'}
              </button>
            </div>

            <div className="p-4 bg-surface-850 rounded-lg border border-surface-800 space-y-2">
              <div className="text-xs font-bold text-slate-300">2. Invariant & Complexity</div>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={complexityExplained}
                  onChange={(e) => setComplexityExplained(e.target.checked)}
                  className="rounded bg-surface-800 border-surface-700 text-brand-500"
                />
                <span>Verbalized time & space bounds before coding</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={edgeCasesTested}
                  onChange={(e) => setEdgeCasesTested(e.target.checked)}
                  className="rounded bg-surface-800 border-surface-700 text-brand-500"
                />
                <span>Walked through normal and boundary test cases</span>
              </label>
            </div>

            <div className="p-4 bg-surface-850 rounded-lg border border-surface-800 space-y-2">
              <div className="text-xs font-bold text-slate-300">3. Follow-Up Variants</div>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={followUpSolved}
                  onChange={(e) => setFollowUpSolved(e.target.checked)}
                  className="rounded bg-surface-800 border-surface-700 text-brand-500"
                />
                <span>Adapted solution for interviewer follow-up</span>
              </label>
              <button
                onClick={() => setVariationsRevealed(!variationsRevealed)}
                className="text-[11px] text-accent-purple hover:underline block pt-1"
              >
                {variationsRevealed ? 'Hide Follow-Ups' : 'Reveal Follow-Up Questions'}
              </button>
            </div>
          </div>

          {/* Follow-up variations */}
          {variationsRevealed && (
            <div className="p-4 bg-purple-950/20 border border-purple-900/30 rounded-lg space-y-2">
              <div className="text-xs font-bold text-purple-300">Interviewer Follow-Up Prompts:</div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                {selectedProblem.interviewVariations.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Pattern Reveal Button (Penalty trigger) */}
          <div className="p-4 bg-surface-850 rounded-lg border border-surface-800 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Need assistance? Revealing will log that pattern guidance was requested.
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPatternRevealed(!patternRevealed)}
                className="px-3 py-1.5 bg-surface-800 hover:bg-surface-750 text-slate-300 rounded text-xs font-medium border border-surface-700 flex items-center gap-1.5"
              >
                {patternRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{patternRevealed ? 'Hide Pattern' : 'Reveal Pattern'}</span>
              </button>
              <button
                onClick={() => setHintsRevealed(!hintsRevealed)}
                className="px-3 py-1.5 bg-surface-800 hover:bg-surface-750 text-slate-300 rounded text-xs font-medium border border-surface-700 flex items-center gap-1.5"
              >
                <span>{hintsRevealed ? 'Hide Recognition Trigger' : 'Reveal Recognition Trigger'}</span>
              </button>
            </div>
          </div>

          {patternRevealed && (
            <div className="p-3 bg-brand-950/30 border border-brand-900/50 rounded-lg text-xs text-brand-300">
              <span className="font-bold">Pattern:</span> {selectedProblem.patterns.join(', ')} •{' '}
              <span className="font-bold">Topic:</span> {selectedProblem.topic}
            </div>
          )}

          {hintsRevealed && (
            <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded-lg text-xs text-amber-300">
              <span className="font-bold">Recognition Triggers:</span>
              <ul className="list-disc pl-4 mt-1 space-y-0.5">
                {selectedProblem.recognitionTriggers.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Notes & Self Rating */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Interview Notes & Communication Reflection
            </label>
            <textarea
              value={interviewNotes}
              onChange={(e) => setInterviewNotes(e.target.value)}
              placeholder="Reflect on communication clarity, edge case misses, or debugging roadblocks..."
              className="w-full bg-surface-850 border border-surface-800 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 h-24 resize-none"
            />
          </div>

          {/* End Simulation Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-surface-800">
            <button
              onClick={() => handleFinishInterview(false)}
              className="px-4 py-2 bg-surface-800 hover:bg-surface-750 text-rose-400 rounded-lg text-xs font-semibold"
            >
              Abort / Incomplete
            </button>
            <button
              onClick={() => handleFinishInterview(true)}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
            >
              Complete & Save Simulation
            </button>
          </div>
        </div>
      ) : (
        /* History & Problem Selection */
        <div className="space-y-6">
          {/* Quick Problem Launcher */}
          <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Select Problem for Mock Simulation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[220px] overflow-y-auto pr-1">
              {problems.slice(0, 30).map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleStartInterview(p)}
                  className="p-3 bg-surface-850 hover:bg-surface-800 border border-surface-750 hover:border-purple-500/50 rounded-lg cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">
                      #{p.leetcodeNumber} {p.title}
                    </div>
                    <div className="text-[10px] text-slate-400">{p.difficulty}</div>
                  </div>
                  <Play className="w-3.5 h-3.5 text-purple-400 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Interview History */}
          <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Simulation History ({interviewHistory.length})</span>
              <span className="text-xs text-slate-500 font-normal">Objective metrics, no hiring verdicts</span>
            </h3>

            {interviewHistory.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No mock interviews recorded yet. Click "Start Random Mock Simulation" to begin your first test!
              </div>
            ) : (
              <div className="space-y-3">
                {interviewHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-surface-850 border border-surface-800 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Simulation Session</span>
                        <span className="text-xs text-slate-400">• {item.date}</span>
                        <span className="text-xs font-mono text-purple-400 font-semibold">
                          {item.durationMinutes} minutes
                        </span>
                        {item.completed ? (
                          <span className="text-[10px] px-1.5 py-0.2 bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 rounded">
                            Completed
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.2 bg-rose-950/40 text-rose-400 border border-rose-900/50 rounded">
                            Incomplete
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-4">
                        <span>Approach Time: {formatTimer(item.timeToApproachSeconds)}</span>
                        <span>Complexity Explained: {item.complexityExplained ? '✓ Yes' : '✕ No'}</span>
                        <span>Edge Cases Tested: {item.edgeCasesCovered ? '✓ Yes' : '✕ No'}</span>
                        <span>Follow-Up Solved: {item.followUpSolved ? '✓ Yes' : '✕ No'}</span>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-slate-300 mt-2 bg-surface-900 p-2 rounded border border-surface-800">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
