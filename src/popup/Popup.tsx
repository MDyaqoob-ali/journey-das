import React, { useEffect, useState } from 'react';
import {
  Flame,
  CheckCircle2,
  Clock,
  ExternalLink,
  LayoutDashboard,
  RefreshCw,
  Settings as SettingsIcon,
  BookOpen,
  AlertTriangle,
  Play,
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import type { DailyWorkload } from '../curriculum/scheduler';
import type { UserSettings } from '../types/settings';
import type { ProblemProgress, ReviewItem } from '../types/db';
import { calculateCurrentDayNumber, buildDailyWorkload, calculateStreak } from '../curriculum/scheduler';
import { getSettings } from '../db/settings-storage';
import { getAllProblemProgress, getReviewsDue } from '../db/database';
import { getProblemById } from '../curriculum/curriculum';

export const Popup: React.FC = () => {
  const [workload, setWorkload] = useState<DailyWorkload | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [progressMap, setProgressMap] = useState<Map<string, ProblemProgress>>(new Map());
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const userSettings = await getSettings();
      setSettings(userSettings);

      const allProg = await getAllProblemProgress();
      const pMap = new Map<string, ProblemProgress>();
      const solvedDates: string[] = [];
      for (const p of allProg) {
        pMap.set(p.problemId, p);
        if (p.accepted && p.lastAttemptDate) {
          solvedDates.push(p.lastAttemptDate);
        }
      }
      setProgressMap(pMap);

      const currentDay = calculateCurrentDayNumber(userSettings.study.startDate);
      const reviews = await getReviewsDue();
      const wl = buildDailyWorkload({
        dayNumber: currentDay,
        settings: userSettings.study,
        progressMap: pMap,
        dueReviews: reviews,
      });
      setWorkload(wl);

      const streakData = calculateStreak({
        completedDates: solvedDates,
        restDays: userSettings.study.restDays,
      });
      setStreak(streakData);
    } catch (err) {
      console.error('Failed to load popup data:', err);
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

  const handleOpenDashboard = (tab?: string) => {
    const url = typeof chrome !== 'undefined' && chrome.runtime?.getURL
      ? chrome.runtime.getURL(`dashboard.html${tab ? `#${tab}` : ''}`)
      : `dashboard.html${tab ? `#${tab}` : ''}`;

    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  const handleSyncGithub = async () => {
    setSyncing(true);
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
        await chrome.runtime.sendMessage({ type: 'TRIGGER_GITHUB_SYNC' });
      }
      await loadData();
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setSyncing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-surface-900 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin text-brand-500" />
      </div>
    );
  }

  const completedToday = workload?.assignedProblems.filter(
    (p) => progressMap.get(p.id)?.accepted
  ).length || 0;
  const totalAssigned = workload?.assignedProblems.length || 0;
  const percentComplete = totalAssigned > 0 ? Math.round((completedToday / totalAssigned) * 100) : 0;

  return (
    <div className="p-4 bg-surface-900 text-slate-100 min-h-[520px] flex flex-col justify-between select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-surface-800">
          <div>
            <h1 className="text-sm font-bold tracking-wider text-brand-400 uppercase">
              Journey Das
            </h1>
            <div className="text-xs text-slate-400 font-medium">
              Month {workload?.monthNumber} • Week {workload?.weekNumber} • Day {workload?.dayNumber}
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-800/80 rounded-full border border-surface-700">
            <Flame className="w-4 h-4 text-accent-amber fill-accent-amber" />
            <span className="text-xs font-bold text-slate-200">{streak.currentStreak}d</span>
          </div>
        </div>

        {/* Today's Goal Card */}
        <div className="mt-3 p-3 bg-surface-850 rounded-lg border border-surface-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-300">Today's Progress</span>
            <span className="font-bold text-brand-400">
              {completedToday} / {totalAssigned} Completed
            </span>
          </div>
          <div className="w-full bg-surface-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-500 to-accent-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* "What Should I Do Now?" Priority Action */}
        {workload?.recommendedNext && (
          <div className="mt-3 p-3 bg-gradient-to-br from-brand-900/40 to-surface-850 rounded-lg border border-brand-500/30">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-400 uppercase tracking-wider mb-1">
              <Play className="w-3.5 h-3.5 fill-brand-400" />
              <span>Next Recommended Action</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <div>
                <div className="text-sm font-bold text-white leading-tight">
                  #{workload.recommendedNext.problem.leetcodeNumber} {workload.recommendedNext.problem.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {workload.recommendedNext.reason}
                </div>
              </div>
              <button
                onClick={() => handleOpenProblem(workload.recommendedNext!.problem.url)}
                className="ml-2 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors shrink-0"
              >
                <span>Solve</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Assigned Problems List */}
        <div className="mt-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Today's Assignment</span>
            <span className="text-[11px] text-slate-500">Max 5/day cap</span>
          </div>
          <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-0.5">
            {workload?.assignedProblems.map((prob) => {
              const prog = progressMap.get(prob.id);
              const isSolved = prog?.accepted;

              return (
                <div
                  key={prob.id}
                  onClick={() => handleOpenProblem(prob.url)}
                  className={`p-2 rounded-md border flex items-center justify-between cursor-pointer transition-colors ${
                    isSolved
                      ? 'bg-surface-850/50 border-surface-800 hover:border-surface-700'
                      : 'bg-surface-850 border-surface-750 hover:border-brand-500/50 hover:bg-surface-800'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="shrink-0">
                      {isSolved ? (
                        <CheckCircle2 className="w-4 h-4 text-accent-green" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-500" />
                      )}
                    </div>
                    <div className="truncate">
                      <div className={`text-xs font-semibold truncate ${isSolved ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                        #{prob.leetcodeNumber} {prob.title}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                        <span
                          className={
                            prob.difficulty === 'Easy'
                              ? 'text-accent-green'
                              : prob.difficulty === 'Medium'
                              ? 'text-accent-amber'
                              : 'text-accent-rose'
                          }
                        >
                          {prob.difficulty}
                        </span>
                        <span>•</span>
                        <span>{prob.patterns[0]}</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Due Reviews (if any) */}
        {workload && workload.dueReviews.length > 0 && (
          <div className="mt-3">
            <div className="text-xs font-semibold text-accent-amber uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Overdue Revision ({workload.dueReviews.length})</span>
            </div>
            <div className="space-y-1">
              {workload.dueReviews.slice(0, 2).map(({ review, problem }) => (
                <div
                  key={review.id}
                  onClick={() => handleOpenProblem(problem.url)}
                  className="p-1.5 px-2 bg-amber-950/20 border border-amber-900/40 rounded flex items-center justify-between cursor-pointer hover:bg-amber-950/40"
                >
                  <div className="truncate text-xs text-amber-200">
                    #{problem.leetcodeNumber} {problem.title}
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-amber-900/50 text-amber-300 rounded font-medium">
                    Review
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer & Quick Actions */}
      <div className="mt-4 pt-3 border-t border-surface-800">
        {/* GitHub Status Line */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 px-1">
          <div className="flex items-center gap-1.5 truncate">
            <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">
              {settings?.github.connected ? settings.github.repo : 'GitHub Disconnected'}
            </span>
          </div>
          {settings?.github.connected && (
            <button
              onClick={handleSyncGithub}
              disabled={syncing}
              className="text-brand-400 hover:text-brand-300 flex items-center gap-1 font-medium disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing...' : 'Sync'}</span>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleOpenDashboard()}
            className="w-full py-2 px-3 bg-surface-800 hover:bg-surface-750 text-slate-200 border border-surface-700 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-brand-400" />
            <span>Open Dashboard</span>
          </button>
          <button
            onClick={() => handleOpenDashboard('settings')}
            className="w-full py-2 px-3 bg-surface-800 hover:bg-surface-750 text-slate-300 border border-surface-700 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <SettingsIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
