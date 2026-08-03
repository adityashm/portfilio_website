import { useState, useEffect } from 'react';
import { Trophy, X, Cpu, Zap, Terminal, FileText, Code, CheckCircle2, Lock, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS, TOTAL_XP } from '../../data/achievements';

const ICON_MAP: Record<string, typeof Trophy> = {
  Cpu,
  Zap,
  Terminal,
  FileText,
  Code,
  Trophy,
};

export default function AchievementCabinetModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

  const loadUnlocked = () => {
    try {
      const stored = localStorage.getItem('unlocked_achievements');
      if (stored) {
        setUnlockedIds(JSON.parse(stored));
      } else {
        setUnlockedIds([]);
      }
    } catch {
      setUnlockedIds([]);
    }
  };

  useEffect(() => {
    const handleOpen = () => {
      loadUnlocked();
      setIsOpen(true);
    };

    const handleUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      setUnlockedIds(customEvent.detail);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('open-achievement-cabinet', handleOpen);
    window.addEventListener('achievements-updated', handleUpdated);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-achievement-cabinet', handleOpen);
      window.removeEventListener('achievements-updated', handleUpdated);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const totalUnlockedXP = ACHIEVEMENTS.filter(a => unlockedIds.includes(a.id)).reduce(
    (sum, a) => sum + a.xp,
    0
  );
  const progressPercent = Math.round((unlockedIds.length / ACHIEVEMENTS.length) * 100);

  const handleReset = () => {
    try {
      localStorage.removeItem('unlocked_achievements');
      setUnlockedIds([]);
      window.dispatchEvent(new CustomEvent('achievements-updated', { detail: [] }));
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-slate-950/95 border border-amber-400/50 rounded-2xl shadow-[0_0_60px_rgba(250,204,21,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-slate-900/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/15 border border-amber-400/50 rounded-xl text-amber-400">
                  <Trophy size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Developer Trophy Cabinet
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full">
                      {totalUnlockedXP} / {TOTAL_XP} XP
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Explore interactive portfolio demos and shortcuts to unlock engineering badges
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  aria-label="Reset unlocked achievements for testing"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 rounded-lg text-xs font-mono transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Reset Demo</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Trophy Cabinet Modal"
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Overall Level Progress Bar */}
            <div className="px-6 py-3 bg-slate-900/50 border-b border-white/10 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300">
                  Total Progress: <strong className="text-amber-400">{unlockedIds.length} of {ACHIEVEMENTS.length} Unlocked</strong> ({progressPercent}%)
                </span>
                <span className="text-cyan-400 font-bold">
                  {unlockedIds.length === ACHIEVEMENTS.length ? '🌟 ALL BADGES UNLOCKED!' : 'Keep exploring to unlock more!'}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Badges Grid */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/50">
              {ACHIEVEMENTS.map((badge) => {
                const isUnlocked = unlockedIds.includes(badge.id);
                const IconComponent = ICON_MAP[badge.icon] || Trophy;

                return (
                  <div
                    key={badge.id}
                    className={`relative p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                      isUnlocked
                        ? 'bg-slate-900/90 border-amber-400/60 shadow-[0_0_25px_rgba(250,204,21,0.12)]'
                        : 'bg-slate-950/70 border-white/10 opacity-70'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl border shrink-0 ${
                        isUnlocked
                          ? 'bg-amber-500/15 border-amber-400/50 text-amber-400 shadow-inner'
                          : 'bg-slate-900 border-white/10 text-slate-600'
                      }`}
                    >
                      <IconComponent size={24} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`font-bold text-sm truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                          {badge.title}
                        </h4>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${
                            isUnlocked
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-bold'
                              : 'bg-slate-800 text-slate-500 border-white/10'
                          }`}
                        >
                          {isUnlocked ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 size={11} /> UNLOCKED
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Lock size={11} /> +{badge.xp} XP
                            </span>
                          )}
                        </span>
                      </div>

                      <p className={`text-xs mt-1 leading-relaxed ${isUnlocked ? 'text-slate-300' : 'text-slate-500'}`}>
                        {badge.description}
                      </p>

                      {!isUnlocked && (
                        <div className="mt-2 pt-2 border-t border-white/5 text-[11px] font-mono text-cyan-400/90">
                          💡 <strong>How to unlock:</strong> {badge.hint}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
              <span>
                Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-white/10 rounded text-slate-300 font-mono">ESC</kbd> to close cabinet
              </span>
              <span className="font-mono text-amber-400">adityashm.tech • Gamified CV</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
