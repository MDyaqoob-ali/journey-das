import React, { useState } from 'react';
import type { UserSettings } from '../../types/settings';
import type { GithubSyncJob } from '../../types/db';
import { connectWithPAT, disconnectGithub } from '../../github/auth';
import { checkRepo } from '../../github/api';
import { retryFailedJobs, processSyncQueue } from '../../github/sync-queue';
import {
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FolderTree,
  ExternalLink,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { GithubIcon } from '../../components/GithubIcon';

interface GithubTabProps {
  settings: UserSettings;
  syncQueue: GithubSyncJob[];
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onRefreshQueue: () => void;
}

export const GithubTab: React.FC<GithubTabProps> = ({
  settings,
  syncQueue,
  onUpdateSettings,
  onRefreshQueue,
}) => {
  const [tokenInput, setTokenInput] = useState(settings.github.accessToken || '');
  const [repoInput, setRepoInput] = useState(settings.github.repo || '');
  const [branchInput, setBranchInput] = useState(settings.github.branch || 'main');
  const [rootDirInput, setRootDirInput] = useState(settings.github.rootDir || 'leetcode/');
  const [autoUpload, setAutoUpload] = useState(settings.github.autoUpload);
  const [autoUploadNonCpp, setAutoUploadNonCpp] = useState(settings.github.autoUploadNonCpp);
  const [generateReadme, setGenerateReadme] = useState(settings.github.generateReadme);
  const [commitTemplate, setCommitTemplate] = useState(settings.github.commitMsgTemplate);

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);

  const handleTestAndSave = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      if (!tokenInput.trim()) {
        setTestResult({ success: false, message: 'Please enter a GitHub Personal Access Token or connect via OAuth.' });
        return;
      }

      // Verify token
      const authResult = await connectWithPAT(tokenInput);
      if (!authResult.success || !authResult.user) {
        setTestResult({ success: false, message: authResult.error || 'Invalid GitHub token' });
        return;
      }

      // If repo entered, test repo existence
      if (repoInput.trim()) {
        const [owner, repo] = repoInput.split('/');
        if (!owner || !repo) {
          setTestResult({ success: false, message: 'Repository must be in "owner/repo" format.' });
          return;
        }

        const repoCheck = await checkRepo(owner, repo, tokenInput.trim());
        if (!repoCheck.exists) {
          setTestResult({ success: false, message: repoCheck.error || 'Repository not accessible.' });
          return;
        }
      }

      // Save settings
      onUpdateSettings({
        github: {
          ...settings.github,
          accessToken: tokenInput.trim(),
          username: authResult.user.login,
          repo: repoInput.trim(),
          branch: branchInput.trim() || 'main',
          rootDir: rootDirInput.trim() || 'leetcode/',
          autoUpload,
          autoUploadNonCpp,
          generateReadme,
          commitMsgTemplate: commitTemplate,
          connected: true,
        },
      });

      setTestResult({
        success: true,
        message: `Successfully connected as @${authResult.user.login}! Ready to commit solutions.`,
      });
    } catch (err: any) {
      setTestResult({ success: false, message: err?.message || 'Connection test failed.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnectGithub();
    setTokenInput('');
    setTestResult(null);
    onUpdateSettings({
      github: {
        ...settings.github,
        accessToken: undefined,
        username: undefined,
        connected: false,
      },
    });
  };

  const handleTriggerSync = async () => {
    setIsProcessingQueue(true);
    try {
      await processSyncQueue();
      onRefreshQueue();
    } finally {
      setIsProcessingQueue(false);
    }
  };

  const handleRetryFailed = async () => {
    setIsProcessingQueue(true);
    try {
      await retryFailedJobs();
      onRefreshQueue();
    } finally {
      setIsProcessingQueue(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Automated Git Portfolio Synchronization</span>
            </div>
            <h2 className="text-xl font-bold text-white">GitHub Integration & Queue</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Automatically commits your accepted C++ solutions to your GitHub repository with portfolio READMEs. Works 100% offline with background retry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                settings.github.connected
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                  : 'bg-surface-800 text-slate-400 border-surface-700'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  settings.github.connected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                }`}
              />
              <span>{settings.github.connected ? `Connected: ${settings.github.repo}` : 'Disconnected'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Repository & Authorization Setup
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              GitHub Personal Access Token (PAT)
            </label>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="github_pat_... or ghp_..."
              className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
            <div className="text-[11px] text-slate-500 mt-1">
              Create a token at GitHub Settings → Developer Settings → Personal Access Tokens with <code className="text-slate-400 font-mono">repo</code> scope.
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Repository (owner/repo)
            </label>
            <input
              type="text"
              value={repoInput}
              onChange={(e) => setRepoInput(e.target.value)}
              placeholder="yourusername/dsa-solutions"
              className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Branch
            </label>
            <input
              type="text"
              value={branchInput}
              onChange={(e) => setBranchInput(e.target.value)}
              placeholder="main"
              className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Root Directory in Repo
            </label>
            <input
              type="text"
              value={rootDirInput}
              onChange={(e) => setRootDirInput(e.target.value)}
              placeholder="leetcode/"
              className="w-full bg-surface-850 border border-surface-750 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Toggles & Behavior */}
        <div className="pt-2 border-t border-surface-800 space-y-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={autoUpload}
              onChange={(e) => setAutoUpload(e.target.checked)}
              className="rounded bg-surface-800 border-surface-700 text-brand-500 focus:ring-0"
            />
            <span>Automatically enqueue and upload C++ solutions when Accepted is detected</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={autoUploadNonCpp}
              onChange={(e) => setAutoUploadNonCpp(e.target.checked)}
              className="rounded bg-surface-800 border-surface-700 text-brand-500 focus:ring-0"
            />
            <span>Auto-upload non-C++ submissions (OFF by default; C++ is priority language)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={generateReadme}
              onChange={(e) => setGenerateReadme(e.target.checked)}
              className="rounded bg-surface-800 border-surface-700 text-brand-500 focus:ring-0"
            />
            <span>Generate structured portfolio README.md with difficulty, patterns, runtime, and invariant notes</span>
          </label>
        </div>

        {/* File Format Preview */}
        <div className="p-3 bg-surface-850 rounded-lg border border-surface-800 space-y-1 text-xs">
          <div className="font-semibold text-slate-300 flex items-center gap-1.5">
            <FolderTree className="w-3.5 h-3.5 text-brand-400" />
            <span>File Structure Preview:</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400 pl-5">
            <div>{rootDirInput.endsWith('/') ? rootDirInput : `${rootDirInput}/`}0001-two-sum/solution.cpp</div>
            <div>{rootDirInput.endsWith('/') ? rootDirInput : `${rootDirInput}/`}0001-two-sum/README.md</div>
          </div>
        </div>

        {/* Action result message */}
        {testResult && (
          <div
            className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              testResult.success
                ? 'bg-emerald-950/30 border border-emerald-900/50 text-emerald-300'
                : 'bg-rose-950/30 border border-rose-900/50 text-rose-300'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleTestAndSave}
            disabled={isTesting}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Verifying...' : 'Save & Test Connection'}</span>
          </button>

          {settings.github.connected && (
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-surface-800 hover:bg-surface-750 text-rose-400 rounded-lg text-xs font-semibold border border-surface-700"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      {/* Sync Queue Inspector */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Sync Queue ({syncQueue.length} Jobs)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Queued jobs upload automatically. If offline, submissions remain safely stored locally in IndexedDB until reconnected.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleTriggerSync}
              disabled={isProcessingQueue}
              className="px-3 py-1.5 bg-surface-800 hover:bg-surface-750 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-surface-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isProcessingQueue ? 'animate-spin' : ''}`} />
              <span>Process Queue</span>
            </button>

            <button
              onClick={handleRetryFailed}
              disabled={isProcessingQueue}
              className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>Retry All Failed</span>
            </button>
          </div>
        </div>

        {syncQueue.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500 bg-surface-850 rounded-lg border border-surface-800">
            Sync queue is empty. Solved problems will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-surface-850 text-slate-400 uppercase tracking-wider text-[10px] border-b border-surface-800">
                <tr>
                  <th className="py-2.5 px-3">Problem</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Attempts</th>
                  <th className="py-2.5 px-3">Path</th>
                  <th className="py-2.5 px-3">Details / Commit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-800">
                {syncQueue.map((job) => (
                  <tr key={job.id} className="hover:bg-surface-850/50">
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {job.problemId}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          job.status === 'SYNCED'
                            ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/50'
                            : job.status === 'UPLOADING' || job.status === 'PENDING'
                            ? 'bg-brand-950/40 text-brand-400 border border-brand-900/50'
                            : 'bg-rose-950/40 text-rose-400 border border-rose-900/50'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono">{job.attempts}/5</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">
                      {job.filePath}
                    </td>
                    <td className="py-2.5 px-3 text-xs">
                      {job.commitUrl ? (
                        <a
                          href={job.commitUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                        >
                          <span>{job.commitSha?.slice(0, 7)}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : job.lastError ? (
                        <span className="text-rose-400 text-[11px]">{job.lastError}</span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
