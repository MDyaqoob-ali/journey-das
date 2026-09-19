import React, { useState, useEffect } from 'react';
import checklistData from '../../data/readiness-checklist.json';
import { CheckSquare, AlertTriangle, ShieldCheck, Award } from 'lucide-react';

export const ReadinessTab: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load from local storage
    try {
      const stored = localStorage.getItem('dsa_readiness_checklist');
      if (stored) {
        setCheckedItems(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('dsa_readiness_checklist', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const totalItems = checklistData.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const percentComplete = Math.round((checkedCount / totalItems) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Part 12 Curriculum Verification</span>
            </div>
            <h2 className="text-xl font-bold text-white">Final 7-Month Interview Readiness Audit</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              An objective checklist describing what the 7-month curriculum expects you to demonstrate before company interviews.
            </p>
          </div>

          <div className="px-4 py-2 bg-surface-850 rounded-lg border border-surface-750 text-center">
            <div className="text-xs text-slate-400">Readiness Score</div>
            <div className="text-xl font-bold text-emerald-400">
              {checkedCount} / {totalItems} ({percentComplete}%)
            </div>
          </div>
        </div>
      </div>

      {/* Realistic Expectations Notice (Part 14) */}
      <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded-xl flex items-start gap-3 text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold">Important Curriculum Boundary:</span> Completing this curriculum does not guarantee employment. It maximizes your DSA problem-solving, C++ fluency, and pattern recognition. SWE hiring also depends on non-DSA computer science fundamentals, system design (for senior roles), resume quality, recruiting timing, and behavioral communication.
        </div>
      </div>

      {/* Checklist Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checklistData.map((cat) => (
          <div
            key={cat.category}
            className="p-5 bg-surface-900 border border-surface-800 rounded-xl space-y-3"
          >
            <div className="flex items-center justify-between border-b border-surface-800 pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {cat.category}
              </h3>
              <span className="text-xs font-mono text-slate-400 font-semibold">
                {cat.items.filter((item) => checkedItems[item.id]).length}/{cat.items.length}
              </span>
            </div>

            <div className="space-y-2">
              {cat.items.map((item) => {
                const isChecked = !!checkedItems[item.id];

                return (
                  <label
                    key={item.id}
                    className={`p-2.5 rounded-lg border flex items-start gap-3 cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-900/40 text-slate-200'
                        : 'bg-surface-850 border-surface-800 text-slate-300 hover:border-surface-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCheck(item.id)}
                      className="rounded bg-surface-800 border-surface-700 text-emerald-500 focus:ring-0 mt-0.5"
                    />
                    <span className="text-xs leading-relaxed">{item.title}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
