import React, { useState, useEffect } from 'react';
import type { ExtractedProblemInfo } from '../adapters/problem-adapter';
import type { AttemptResult, LearningState } from '../../../types/db';

interface FloatingTrackerProps {
  problemInfo: ExtractedProblemInfo;
  onTimerAction: (action: 'START' | 'PAUSE' | 'RESUME' | 'RESET') => void;
  onSubmitResult: (result: AttemptResult, notes: string, confidence: number, state: LearningState) => void;
  onManualGithubUpload: (code: string) => void;
  timerSeconds: number;
  timerState: 'RUNNING' | 'PAUSED' | 'IDLE';
  currentStatus: LearningState;
  githubSyncStatus: 'NONE' | 'PENDING' | 'SYNCED' | 'FAILED';
  lastSha?: string;
}

export const FloatingTracker: React.FC<FloatingTrackerProps> = ({
  problemInfo,
  onTimerAction,
  onSubmitResult,
  onManualGithubUpload,
  timerSeconds,
  timerState,
  currentStatus,
  githubSyncStatus,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showPattern, setShowPattern] = useState(false);
  const [notes, setNotes] = useState('');
  const [confidence, setConfidence] = useState(4);
  const [selectedState, setSelectedState] = useState<LearningState>('SOLVED_INDEPENDENTLY');

  const curriculum = problemInfo.curriculumProblem;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const getStatusBadge = () => {
    switch (currentStatus) {
      case 'MASTERED':
      case 'SOLVED_INDEPENDENTLY':
        return <span style={{ color: '#10b981', fontWeight: 600 }}>✓ Solved</span>;
      case 'SOLVED_WITH_HINT':
        return <span style={{ color: '#f59e0b', fontWeight: 600 }}>Solved with Hint</span>;
      case 'SOLVED_WITH_SOLUTION':
        return <span style={{ color: '#f97316', fontWeight: 600 }}>Needed Solution</span>;
      case 'FAILED':
        return <span style={{ color: '#ef4444', fontWeight: 600 }}>Failed</span>;
      case 'IN_PROGRESS':
        return <span style={{ color: '#38bdf8', fontWeight: 600 }}>In Progress</span>;
      default:
        return <span style={{ color: '#94a3b8' }}>Not Started</span>;
    }
  };

  const getGithubBadge = () => {
    switch (githubSyncStatus) {
      case 'SYNCED':
        return <span style={{ color: '#10b981', fontSize: '11px' }}>✓ GitHub Synced</span>;
      case 'PENDING':
        return <span style={{ color: '#38bdf8', fontSize: '11px' }}>⏳ Uploading to GitHub...</span>;
      case 'FAILED':
        return <span style={{ color: '#ef4444', fontSize: '11px' }}>⚠ GitHub Sync Failed</span>;
      default:
        return null;
    }
  };

  if (isCollapsed) {
    return (
      <div
        onClick={() => setIsCollapsed(false)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999999,
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: '9999px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
          border: '1px solid #334155',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '13px',
          fontWeight: 600,
        }}
        title="Click to expand Journey Das"
      >
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: timerState === 'RUNNING' ? '#10b981' : '#38bdf8' }} />
        <span>Journey Das</span>
        <span style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{formatTime(timerSeconds)}</span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999999,
        width: '320px',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
        border: '1px solid #334155',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
        fontSize: '13px',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '10px 14px',
          backgroundColor: '#1e293b',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: timerState === 'RUNNING' ? '#10b981' : '#94a3b8' }} />
          <span style={{ fontWeight: 700, fontSize: '12px', letterSpacing: '0.05em', color: '#38bdf8' }}>JOURNEY DAS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setIsCollapsed(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '2px 6px',
            }}
            title="Minimize"
          >
            —
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '14px' }}>
        {/* Curriculum context */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Curriculum</div>
          <div style={{ fontWeight: 600, color: '#e2e8f0', marginTop: '2px' }}>
            {curriculum ? `Month ${curriculum.month} → Week ${curriculum.week} → Day ${curriculum.day}` : 'Practice Problem (Catalog)'}
          </div>
        </div>

        {/* Problem Title & Difficulty */}
        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '14px' }}>
            #{problemInfo.number || ''} {problemInfo.title}
          </span>
          {curriculum && (
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 600,
                backgroundColor:
                  curriculum.difficulty === 'Easy'
                    ? 'rgba(16, 185, 129, 0.2)'
                    : curriculum.difficulty === 'Medium'
                    ? 'rgba(245, 158, 11, 0.2)'
                    : 'rgba(244, 63, 94, 0.2)',
                color:
                  curriculum.difficulty === 'Easy'
                    ? '#34d399'
                    : curriculum.difficulty === 'Medium'
                    ? '#fbbf24'
                    : '#fb7185',
              }}
            >
              {curriculum.difficulty}
            </span>
          )}
        </div>

        {/* Pattern / Hidden Pattern */}
        {curriculum && (
          <div style={{ marginBottom: '12px', padding: '8px 10px', backgroundColor: '#1e293b', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Pattern</span>
              {!showPattern && (
                <button
                  onClick={() => setShowPattern(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#38bdf8',
                    cursor: 'pointer',
                    fontSize: '11px',
                    textDecoration: 'underline',
                  }}
                >
                  Reveal
                </button>
              )}
            </div>
            <div style={{ marginTop: '2px', fontWeight: 500, color: showPattern ? '#38bdf8' : '#64748b' }}>
              {showPattern ? curriculum.patterns.join(', ') : '●●●●● (Hidden for Interview Mode)'}
            </div>
          </div>
        )}

        {/* Timer Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            backgroundColor: '#020617',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            marginBottom: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Elapsed Time</div>
            <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'monospace', color: '#38bdf8' }}>
              {formatTime(timerSeconds)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {timerState === 'RUNNING' ? (
              <button
                onClick={() => onTimerAction('PAUSE')}
                style={{
                  backgroundColor: '#334155',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                Pause
              </button>
            ) : (
              <button
                onClick={() => onTimerAction(timerState === 'PAUSED' ? 'RESUME' : 'START')}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                {timerState === 'PAUSED' ? 'Resume' : 'Start'}
              </button>
            )}
          </div>
        </div>

        {/* Status & GitHub */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Status</div>
            {getStatusBadge()}
          </div>
          <div style={{ textAlign: 'right' }}>{getGithubBadge()}</div>
        </div>

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={() => setShowResultModal(true)}
            style={{
              backgroundColor: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '12px',
            }}
          >
            Mark Result
          </button>
          <button
            onClick={() => {
              if (chrome.runtime && chrome.runtime.openOptionsPage) {
                chrome.runtime.openOptionsPage();
              } else {
                window.open(chrome.runtime.getURL('dashboard.html'), '_blank');
              }
            }}
            style={{
              backgroundColor: '#0f172a',
              color: '#38bdf8',
              border: '1px solid #0284c7',
              borderRadius: '6px',
              padding: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '12px',
            }}
          >
            Open Dashboard
          </button>
        </div>
      </div>

      {/* Result Modal / Protocol */}
      {showResultModal && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#0f172a',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: '#ffffff' }}>
              How did this attempt go?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              {[
                { state: 'SOLVED_INDEPENDENTLY', label: 'Solved Independently' },
                { state: 'SOLVED_WITH_HINT', label: 'Needed a Hint' },
                { state: 'SOLVED_WITH_SOLUTION', label: 'Needed the Solution' },
                { state: 'FAILED', label: 'Failed' },
                { state: 'SOLVED_TOO_SLOWLY', label: 'Solved, but too slowly' },
              ].map(({ state, label }) => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state as LearningState)}
                  style={{
                    backgroundColor: selectedState === state ? '#0284c7' : '#1e293b',
                    color: '#ffffff',
                    border: '1px solid',
                    borderColor: selectedState === state ? '#38bdf8' : '#334155',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Confidence (1-5)</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => setConfidence(val)}
                    style={{
                      flex: 1,
                      padding: '4px',
                      borderRadius: '4px',
                      backgroundColor: confidence === val ? '#0ea5e9' : '#1e293b',
                      color: '#ffffff',
                      border: '1px solid #334155',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Notes / Invariants</div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Key invariant, takeaway, or mistake..."
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  height: '45px',
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  padding: '6px',
                  fontSize: '11px',
                  resize: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button
              onClick={() => setShowResultModal(false)}
              style={{
                flex: 1,
                padding: '8px',
                backgroundColor: '#334155',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const resType: AttemptResult =
                  selectedState === 'FAILED' ? 'WRONG_ANSWER' : 'ACCEPTED';
                onSubmitResult(resType, notes, confidence, selectedState);
                setShowResultModal(false);
              }}
              style={{
                flex: 1,
                padding: '8px',
                backgroundColor: '#10b981',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '12px',
              }}
            >
              Save Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
