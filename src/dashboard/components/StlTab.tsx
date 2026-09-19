import React from 'react';
import type { StlConceptProgress } from '../../types/db';
import stlCatalog from '../../data/stl-catalog.json';
import { Code2, CheckCircle2, BookOpen, Layers, Sparkles } from 'lucide-react';

interface StlTabProps {
  stlProgress: StlConceptProgress[];
  onUpdateStl: (item: StlConceptProgress) => void;
}

export const StlTab: React.FC<StlTabProps> = ({ stlProgress, onUpdateStl }) => {
  const progressMap = new Map<string, StlConceptProgress>();
  for (const item of stlProgress) {
    progressMap.set(item.id, item);
  }

  const stages = ['INTRODUCED', 'USED', 'REINFORCED', 'MIXED_PRACTICE', 'MASTERED'] as const;

  const handleStageChange = (id: string, stage: StlConceptProgress['stage']) => {
    const current = progressMap.get(id);
    if (current) {
      onUpdateStl({ ...current, stage });
    }
  };

  const handleCheckbox = (id: string, field: 'canExplain' | 'canCodeWithoutReference') => {
    const current = progressMap.get(id);
    if (current) {
      onUpdateStl({ ...current, [field]: !current[field] });
    }
  };

  const masteredCount = Array.from(progressMap.values()).filter(
    (p) => p.stage === 'MASTERED' || (p.canExplain && p.canCodeWithoutReference)
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-surface-900 border border-surface-800 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
              <Code2 className="w-3.5 h-3.5" />
              <span>C++ Standard Template Library Mastery</span>
            </div>
            <h2 className="text-xl font-bold text-white">C++ STL Progression Tracker</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              C++ is the curriculum's priority language. Track your mastery across standard containers, algorithms, iterators, custom comparators, lambdas, and graph primitives.
            </p>
          </div>

          <div className="px-4 py-2 bg-surface-850 rounded-lg border border-surface-750 text-center">
            <div className="text-xs text-slate-400">Mastered Concepts</div>
            <div className="text-xl font-bold text-emerald-400">
              {masteredCount} <span className="text-xs font-normal text-slate-400">/ {stlCatalog.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of STL Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stlCatalog.map((catalogItem) => {
          const prog = progressMap.get(catalogItem.id) || {
            id: catalogItem.id,
            name: catalogItem.name,
            category: catalogItem.category as any,
            stage: 'INTRODUCED',
            canExplain: false,
            canCodeWithoutReference: false,
          };

          return (
            <div
              key={catalogItem.id}
              className="p-4 bg-surface-900 border border-surface-800 rounded-xl space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-400">
                      {catalogItem.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-800 text-slate-400 border border-surface-700">
                      {catalogItem.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {catalogItem.description}
                  </p>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Target timeline: {catalogItem.weeks}
                  </div>
                </div>
              </div>

              {/* Stage Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Proficiency Stage
                </label>
                <div className="grid grid-cols-5 gap-1 text-center">
                  {stages.map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStageChange(catalogItem.id, st)}
                      className={`py-1 text-[10px] font-semibold rounded border transition-colors ${
                        prog.stage === st
                          ? 'bg-brand-600 border-brand-500 text-white'
                          : 'bg-surface-850 border-surface-800 text-slate-400 hover:bg-surface-800'
                      }`}
                    >
                      {st.replace('_', ' ').slice(0, 6)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fluency Checkboxes */}
              <div className="flex flex-wrap gap-4 pt-1 border-t border-surface-800 text-xs">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prog.canExplain}
                    onChange={() => handleCheckbox(catalogItem.id, 'canExplain')}
                    className="rounded bg-surface-800 border-surface-700 text-brand-500"
                  />
                  <span>Can explain complexity</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prog.canCodeWithoutReference}
                    onChange={() => handleCheckbox(catalogItem.id, 'canCodeWithoutReference')}
                    className="rounded bg-surface-800 border-surface-700 text-brand-500"
                  />
                  <span>Can code from scratch</span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
