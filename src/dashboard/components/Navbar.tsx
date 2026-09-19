import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Layers,
  RotateCcw,
  AlertCircle,
  BarChart3,
  Terminal,
  Code2,
  Settings,
  CheckSquare,
  Flame,
} from 'lucide-react';
import { GithubIcon } from '../../components/GithubIcon';

export type DashboardTab =
  | 'overview'
  | 'today'
  | 'curriculum'
  | 'revision'
  | 'mistakes'
  | 'analytics'
  | 'interview'
  | 'stl'
  | 'github'
  | 'readiness'
  | 'settings';

interface NavbarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  streak: number;
  dueReviewsCount: number;
  githubConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  streak,
  dueReviewsCount,
  githubConnected,
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'curriculum', label: 'Curriculum', icon: Layers },
    { id: 'revision', label: 'Revision', icon: RotateCcw, badge: dueReviewsCount > 0 ? dueReviewsCount : undefined },
    { id: 'interview', label: 'Interview Mode', icon: Terminal },
    { id: 'stl', label: 'C++ STL', icon: Code2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'mistakes', label: 'Mistakes', icon: AlertCircle },
    { id: 'readiness', label: 'Readiness', icon: CheckSquare },
    { id: 'github', label: 'GitHub', icon: GithubIcon, indicator: githubConnected ? 'green' : 'gray' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="border-b border-surface-800 bg-surface-900/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center shadow-md shadow-brand-500/20">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                <span>Journey Das</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 font-mono font-medium border border-brand-500/30">
                  v1.0.0
                </span>
              </div>
              <div className="text-xs text-slate-400">7-Month C++ Interview Preparation</div>
            </div>
          </div>

          {/* Streak Badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-800 rounded-full border border-surface-700">
              <Flame className="w-4 h-4 text-accent-amber fill-accent-amber" />
              <span className="text-xs font-bold text-slate-200">{streak} Day Streak</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id as DashboardTab)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-surface-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-accent-amber text-black font-bold">
                    {tab.badge}
                  </span>
                )}
                {tab.indicator && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      tab.indicator === 'green' ? 'bg-accent-green' : 'bg-slate-500'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
