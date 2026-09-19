import React, { useState } from 'react';
import type { UserSettings } from '../../types/settings';
import { exportAllData, importAllData } from '../../db/backup';
import {
  Settings,
  Download,
  Upload,
  RotateCcw,
  Bug,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  Layers,
  Terminal,
} from 'lucide-react';

interface SettingsTabProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onRefreshAllData: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onUpdateSettings,
  onRefreshAllData,
}) => {
  const [startDate, setStartDate] = useState(settings.study.startDate);
  const [dailyMax, setDailyMax] = useState(settings.study.dailyMaxProblems || 5);
  const [preferredCapacity, setPreferredCapacity] = useState(settings.study.preferredDayCapacity || 2);
  const [restDays, setRestDays] = useState<number[]>(settings.study.restDays || [0]);
  const [notifications, setNotifications] = useState(settings.notificationsEnabled);
  const [theme, setTheme] = useState(settings.theme || 'dark');

  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const toggleRestDay = (dayIdx: number) => {
    setRestDays((prev) => {
      const next = prev.includes(dayIdx) ? prev.filter((d) => d !== dayIdx) : [...prev, dayIdx];
      return next;
    });
  };

  const handleSaveStudySettings = () => {
    onUpdateSettings({
      theme,
      notificationsEnabled: notifications,
      study: {
        ...settings.study,
        startDate,
        dailyMaxProblems: Math.min(5, Math.max(1, dailyMax)),
        preferredDayCapacity: Math.min(5, Math.max(1, preferredCapacity)),
        restDays,
      },
    });
  };

  const handleExport = async () => {
    try {
      const json = await exportAllData();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dsa-progress-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setExportMessage('Backup downloaded successfully! (OAuth tokens stripped)');
      setTimeout(() => setExportMessage(null), 4000);
    } catch (err: any) {
      setExportMessage(`Export failed: ${err.message}`);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const res = await importAllData(text);
      if (res.success) {
        setImportMessage(res.message);
        onRefreshAllData();
      } else {
        setImportMessage(`Import error: ${res.message}`);
      }
    } catch (err: any) {
      setImportMessage(`Failed to read file: ${err.message}`);
    }
  };

  const handleResetProgress = async () => {
    if (typeof indexedDB !== 'undefined') {
      indexedDB.deleteDatabase('dsa_progress_tracker_db');
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
          <Settings className="w-3.5 h-3.5" />
          <span>System & Schedule Preferences</span>
        </div>
        <h2 className="text-xl font-bold text-white">Application Settings</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Customize your study cadence, rest days, data exports, notifications, and developer diagnostics.
        </p>
      </div>

      {/* Study Settings Form */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl space-y-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Curriculum & Cadence Controls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Curriculum Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Daily Workload Cap (Curriculum Limit)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={dailyMax}
              onChange={(e) => setDailyMax(parseInt(e.target.value, 10) || 5)}
              className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2 text-xs text-white"
            />
            <div className="text-[10px] text-slate-500 mt-1">Strict hard cap: Maximum 5 problems/day.</div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Preferred New Problems / Day
            </label>
            <input
              type="number"
              min="1"
              max="3"
              value={preferredCapacity}
              onChange={(e) => setPreferredCapacity(parseInt(e.target.value, 10) || 2)}
              className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2 text-xs text-white"
            />
            <div className="text-[10px] text-slate-500 mt-1">Standard learning pace: 2 problems.</div>
          </div>
        </div>

        {/* Rest Days */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Designated Rest Days (Streak Preserving)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {daysOfWeek.map((dayName, idx) => {
              const isRest = restDays.includes(idx);
              return (
                <button
                  key={dayName}
                  type="button"
                  onClick={() => toggleRestDay(idx)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors ${
                    isRest
                      ? 'bg-brand-950/40 border-brand-500 text-brand-300'
                      : 'bg-surface-850 border-surface-750 text-slate-400 hover:bg-surface-800'
                  }`}
                >
                  {dayName.slice(0, 3)} {isRest && '✓'}
                </button>
              );
            })}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Days marked as Rest will not break your study streak.
          </div>
        </div>

        {/* General Toggles */}
        <div className="pt-2 border-t border-surface-800 space-y-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="rounded bg-surface-800 border-surface-700 text-brand-500"
            />
            <span>Enable Chrome Notifications on Problem Acceptance and Daily Revisions</span>
          </label>
        </div>

        <button
          onClick={handleSaveStudySettings}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          Save Cadence Preferences
        </button>
      </div>

      {/* Backup & Restore Section */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Backup & Restore (Privacy Safe)
        </h3>
        <p className="text-xs text-slate-400">
          Your progress is stored 100% locally in IndexedDB. Export your full dataset at any time as JSON. Sensitive tokens and secrets are automatically stripped from exports.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-surface-850 hover:bg-surface-800 border border-surface-750 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-brand-400" />
            <span>Export Progress (JSON)</span>
          </button>

          <label className="px-4 py-2 bg-surface-850 hover:bg-surface-800 border border-surface-750 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Import Backup</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        {exportMessage && (
          <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{exportMessage}</span>
          </div>
        )}

        {importMessage && (
          <div className="p-3 bg-brand-950/30 border border-brand-900/50 rounded-lg text-xs text-brand-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-400" />
            <span>{importMessage}</span>
          </div>
        )}
      </div>

      {/* Developer Diagnostics Panel */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Bug className="w-4 h-4 text-purple-400" />
          <span>Developer Diagnostics & State</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-surface-850 rounded-lg border border-surface-800">
            <div className="text-slate-500">Curriculum Problems</div>
            <div className="text-white font-mono font-bold mt-1">176 Core</div>
          </div>
          <div className="p-3 bg-surface-850 rounded-lg border border-surface-800">
            <div className="text-slate-500">Database Engine</div>
            <div className="text-white font-mono font-bold mt-1">IndexedDB v1</div>
          </div>
          <div className="p-3 bg-surface-850 rounded-lg border border-surface-800">
            <div className="text-slate-500">Manifest Version</div>
            <div className="text-white font-mono font-bold mt-1">MV3 (Chrome)</div>
          </div>
          <div className="p-3 bg-surface-850 rounded-lg border border-surface-800">
            <div className="text-slate-500">Build Target</div>
            <div className="text-white font-mono font-bold mt-1">Vite + React 18</div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-4 border-t border-surface-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-rose-400">Danger Zone: Reset All Local Data</div>
            <div className="text-[11px] text-slate-500">
              Permanently clears local database, sessions, and attempts.
            </div>
          </div>

          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-3 py-1.5 bg-surface-850 hover:bg-rose-950/40 text-rose-400 border border-rose-900/40 rounded-lg text-xs font-semibold"
            >
              Reset Progress
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 bg-surface-800 text-slate-300 rounded text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleResetProgress}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
