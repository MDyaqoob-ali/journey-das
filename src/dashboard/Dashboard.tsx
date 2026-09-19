import React, { useState, useEffect } from 'react';
import { Navbar, type DashboardTab } from './components/Navbar';
import { OverviewTab } from './components/OverviewTab';
import { TodayTab } from './components/TodayTab';
import { CurriculumTab } from './components/CurriculumTab';
import { RevisionTab } from './components/RevisionTab';
import { InterviewTab } from './components/InterviewTab';
import { StlTab } from './components/StlTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { MistakesTab } from './components/MistakesTab';
import { ReadinessTab } from './components/ReadinessTab';
import { GithubTab } from './components/GithubTab';
import { SettingsTab } from './components/SettingsTab';
import { ResultModal } from './components/ResultModal';

import { getAllProblems, getProblemById } from '../curriculum/curriculum';
import {
  getAllProblemProgress,
  getAllReviews,
  getGithubQueue,
  getInterviewSessions,
  getErrorLogs,
  getAllStlProgress,
  saveProblemProgress,
  recordAttempt,
  saveReview,
  saveInterviewSession,
  addErrorLog,
  saveStlProgress,
  enqueueGithubJob,
} from '../db/database';
import { getSettings, saveSettings } from '../db/settings-storage';
import { calculateCurrentDayNumber, buildDailyWorkload, calculateStreak } from '../curriculum/scheduler';
import { computeNextReview } from '../curriculum/revision';
import { processSyncQueue } from '../github/sync-queue';
import { generateProblemPath } from '../github/api';

import type { ProblemProgress, ReviewItem, GithubSyncJob, InterviewSessionRecord, ErrorLogEntry, StlConceptProgress, AttemptResult, LearningState } from '../types/db';
import type { UserSettings } from '../types/settings';
import type { CurriculumProblem } from '../types/curriculum';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('today');
  const [problems, setProblems] = useState<CurriculumProblem[]>([]);
  const [problemsMap, setProblemsMap] = useState<Map<string, CurriculumProblem>>(new Map());
  const [progressMap, setProgressMap] = useState<Map<string, ProblemProgress>>(new Map());
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [syncQueue, setSyncQueue] = useState<GithubSyncJob[]>([]);
  const [interviewHistory, setInterviewHistory] = useState<InterviewSessionRecord[]>([]);
  const [errorLogs, setErrorLogs] = useState<ErrorLogEntry[]>([]);
  const [stlProgress, setStlProgress] = useState<StlConceptProgress[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [modalProblem, setModalProblem] = useState<CurriculumProblem | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<number | null>(null);

  // Load initial data
  useEffect(() => {
    loadAllData();

    // Check hash for initial tab
    const hash = window.location.hash.replace('#', '');
    if (hash && ['overview', 'today', 'curriculum', 'revision', 'interview', 'stl', 'analytics', 'mistakes', 'readiness', 'github', 'settings'].includes(hash)) {
      setActiveTab(hash as DashboardTab);
    }
  }, []);

  const loadAllData = async () => {
    try {
      const allProblems = getAllProblems();
      setProblems(allProblems);
      const pMap = new Map<string, CurriculumProblem>();
      for (const p of allProblems) pMap.set(p.id, p);
      setProblemsMap(pMap);

      const [storedSettings, allProg, allRevs, queue, interviews, errors, stl] = await Promise.all([
        getSettings(),
        getAllProblemProgress(),
        getAllReviews(),
        getGithubQueue(),
        getInterviewSessions(),
        getErrorLogs(),
        getAllStlProgress(),
      ]);

      setSettings(storedSettings);
      if (!storedSettings.onboardingCompleted) {
        setOnboardingStep(1);
      }

      const progMap = new Map<string, ProblemProgress>();
      for (const p of allProg) {
        progMap.set(p.problemId, p);
      }
      setProgressMap(progMap);
      setReviews(allRevs);
      setSyncQueue(queue);
      setInterviewHistory(interviews);
      setErrorLogs(errors);
      setStlProgress(stl);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenProblem = (url: string) => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  const handleRecordResult = async (params: {
    problemId: string;
    result: AttemptResult;
    state: LearningState;
    confidence: number;
    canExplain: boolean;
    canCodeFromScratch: boolean;
    forgotPattern: boolean;
    notes: string;
    solveTimeSeconds: number;
  }) => {
    const { problemId, result, state, confidence, canExplain, canCodeFromScratch, forgotPattern, notes, solveTimeSeconds } = params;
    const problem = problemsMap.get(problemId);
    const existing = progressMap.get(problemId);

    // Record attempt
    await recordAttempt({
      id: `att-${problemId}-${Date.now()}`,
      problemId,
      timestamp: Date.now(),
      result,
      language: 'C++',
      code: '',
      solveTimeSeconds,
      confidence,
      neededHint: state === 'SOLVED_WITH_HINT',
      neededSolution: state === 'SOLVED_WITH_SOLUTION',
      canExplain,
      canCodeFromScratch,
      notes,
    });

    // Update problem progress
    const updatedProg: ProblemProgress = {
      problemId,
      leetcodeNumber: problem ? problem.leetcodeNumber : 0,
      slug: problem ? problem.slug : '',
      status: state,
      firstAttemptDate: existing?.firstAttemptDate || new Date().toISOString().slice(0, 10),
      lastAttemptDate: new Date().toISOString().slice(0, 10),
      attemptCount: (existing?.attemptCount || 0) + 1,
      accepted: result === 'ACCEPTED',
      neededHint: state === 'SOLVED_WITH_HINT',
      neededSolution: state === 'SOLVED_WITH_SOLUTION',
      solveTimeSeconds: (existing?.solveTimeSeconds || 0) + solveTimeSeconds,
      confidence,
      canExplain,
      canCodeFromScratch,
      forgotPattern,
      notes: notes || existing?.notes || '',
      githubSyncStatus: existing?.githubSyncStatus || 'NONE',
    };
    await saveProblemProgress(updatedProg);

    // Schedule spaced review
    const review = computeNextReview({
      problemId,
      currentState: state,
      result,
      confidence,
      neededHint: updatedProg.neededHint,
      neededSolution: updatedProg.neededSolution,
      canExplain,
      canCodeFromScratch,
    });
    await saveReview(review);

    await loadAllData();
  };

  const handleUpdateSettings = async (newSettings: Partial<UserSettings>) => {
    const updated = await saveSettings(newSettings);
    setSettings(updated);
  };

  const handleSaveInterview = async (session: InterviewSessionRecord) => {
    await saveInterviewSession(session);
    setInterviewHistory((prev) => [session, ...prev]);
  };

  const handleAddErrorLog = async (entry: ErrorLogEntry) => {
    await addErrorLog(entry);
    setErrorLogs((prev) => [entry, ...prev]);
  };

  const handleUpdateStl = async (item: StlConceptProgress) => {
    await saveStlProgress(item);
    setStlProgress((prev) => prev.map((s) => (s.id === item.id ? item : s)));
  };

  if (isLoading || !settings) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center text-slate-400">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-sm font-medium">Loading 7-Month DSA Curriculum...</div>
        </div>
      </div>
    );
  }

  // Workload calculations
  const currentDay = calculateCurrentDayNumber(settings.study.startDate);
  const dueReviews = reviews.filter((r) => r.status === 'DUE' && r.scheduledDate <= new Date().toISOString().slice(0, 10));
  const workload = buildDailyWorkload({
    dayNumber: currentDay,
    settings: settings.study,
    progressMap,
    dueReviews,
  });

  const solvedDates: string[] = [];
  for (const prog of progressMap.values()) {
    if (prog.accepted && prog.lastAttemptDate) {
      solvedDates.push(prog.lastAttemptDate);
    }
  }
  const streak = calculateStreak({
    completedDates: solvedDates,
    restDays: settings.study.restDays,
  });

  return (
    <div className="min-h-screen bg-surface-950 text-slate-100 flex flex-col">
      {/* Onboarding Wizard Modal if not completed */}
      {onboardingStep !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-900 border border-surface-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
                DSA
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Welcome to Journey Das</h3>
                <div className="text-xs text-slate-400">7-Month C++ Interview Preparation System</div>
              </div>
            </div>

            {onboardingStep === 1 && (
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>
                  This system implements the authoritative 7-month curriculum specification: 176 unique core problems, progressive patterns, spaced repetition, topic-hidden interview simulations, and automated GitHub portfolio synchronization.
                </p>
                <div className="p-3 bg-surface-850 rounded-xl border border-surface-800 space-y-1">
                  <div className="font-bold text-white">Curriculum Philosophy:</div>
                  <div>• Maximum 5 active problems per day hard cap.</div>
                  <div>• Mastery & invariant explanation over raw question count.</div>
                  <div>• C++ as the required interview implementation language.</div>
                </div>
                <button
                  onClick={() => setOnboardingStep(2)}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 mt-4"
                >
                  <span>Next: Configure Cadence</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-4 text-xs text-slate-300">
                <div>
                  <label className="block font-semibold text-white mb-1">
                    Preferred Daily Learning Capacity
                  </label>
                  <select
                    value={settings.study.preferredDayCapacity}
                    onChange={(e) =>
                      handleUpdateSettings({
                        study: {
                          ...settings.study,
                          preferredDayCapacity: parseInt(e.target.value, 10),
                        },
                      })
                    }
                    className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2 text-xs text-white"
                  >
                    <option value={1}>1 New Problem / Day (Gentle)</option>
                    <option value={2}>2 New Problems / Day (Recommended Curriculum Pace)</option>
                    <option value={3}>3 New Problems / Day (Intensive)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-white mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={settings.study.startDate}
                    onChange={(e) =>
                      handleUpdateSettings({
                        study: {
                          ...settings.study,
                          startDate: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <button
                  onClick={() => setOnboardingStep(3)}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 mt-4"
                >
                  <span>Next: GitHub Portfolio Sync</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-4 text-xs text-slate-300">
                <p>
                  You can connect your GitHub repository now or later via the GitHub tab. When enabled, your accepted C++ solutions will automatically commit to your portfolio.
                </p>
                <div className="p-3 bg-surface-850 rounded-xl border border-surface-800 text-[11px] text-slate-400">
                  You can configure your Personal Access Token in the GitHub tab at any time.
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      handleUpdateSettings({ onboardingCompleted: true });
                      setOnboardingStep(null);
                    }}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Launch Today's Training</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.location.hash = tab;
        }}
        streak={streak.currentStreak}
        dueReviewsCount={dueReviews.length}
        githubConnected={settings.github.connected}
      />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'today' && (
          <TodayTab
            workload={workload}
            progressMap={progressMap}
            onRecordResult={handleRecordResult}
            onOpenProblem={handleOpenProblem}
          />
        )}

        {activeTab === 'overview' && (
          <OverviewTab
            problems={problems}
            progressMap={progressMap}
            streak={streak}
            interviewCount={interviewHistory.length}
          />
        )}

        {activeTab === 'curriculum' && (
          <CurriculumTab
            problems={problems}
            progressMap={progressMap}
            onOpenProblem={handleOpenProblem}
            onSelectProblemForModal={(p) => setModalProblem(p)}
          />
        )}

        {activeTab === 'revision' && (
          <RevisionTab
            reviews={reviews}
            problemsMap={problemsMap}
            progressMap={progressMap}
            onOpenProblem={handleOpenProblem}
            onRecordResult={handleRecordResult}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewTab
            problems={problems}
            interviewHistory={interviewHistory}
            onSaveInterview={handleSaveInterview}
            onOpenProblem={handleOpenProblem}
          />
        )}

        {activeTab === 'stl' && (
          <StlTab stlProgress={stlProgress} onUpdateStl={handleUpdateStl} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab problems={problems} progressMap={progressMap} />
        )}

        {activeTab === 'mistakes' && (
          <MistakesTab
            errorLogs={errorLogs}
            problemsMap={problemsMap}
            onAddErrorLog={handleAddErrorLog}
            onOpenProblem={handleOpenProblem}
          />
        )}

        {activeTab === 'readiness' && <ReadinessTab />}

        {activeTab === 'github' && (
          <GithubTab
            settings={settings}
            syncQueue={syncQueue}
            onUpdateSettings={handleUpdateSettings}
            onRefreshQueue={loadAllData}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onRefreshAllData={loadAllData}
          />
        )}
      </main>

      {/* Global Result Modal */}
      {modalProblem && (
        <ResultModal
          problem={modalProblem}
          onClose={() => setModalProblem(null)}
          onSubmit={(data) => {
            handleRecordResult({
              problemId: modalProblem.id,
              ...data,
            });
          }}
        />
      )}
    </div>
  );
};
