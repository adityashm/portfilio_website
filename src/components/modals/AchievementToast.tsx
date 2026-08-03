import { useState, useEffect } from 'react';
import { Trophy, X, Cpu, Zap, Terminal, FileText, Code, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS, Achievement } from '../../data/achievements';

const ICON_MAP: Record<string, typeof Trophy> = {
  Cpu,
  Zap,
  Terminal,
  FileText,
  Code,
  Trophy,
};

export default function AchievementToast() {
  const [activeToast, setActiveToast] = useState<{
    achievement: Achievement;
    totalUnlocked: number;
  } | null>(null);

  useEffect(() => {
    const handleUnlock = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const badgeId = customEvent.detail;
      const target = ACHIEVEMENTS.find(a => a.id === badgeId);
      if (!target) return;

      try {
        const stored = localStorage.getItem('unlocked_achievements');
        const unlockedList: string[] = stored ? JSON.parse(stored) : [];
        if (!unlockedList.includes(badgeId)) {
          const updated = [...unlockedList, badgeId];
          localStorage.setItem('unlocked_achievements', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('achievements-updated', { detail: updated }));

          setActiveToast({
            achievement: target,
            totalUnlocked: updated.length,
          });
        }
      } catch {
        // Fallback if localStorage is disabled
      }
    };

    window.addEventListener('unlock-achievement', handleUnlock);
    return () => window.removeEventListener('unlock-achievement', handleUnlock);
  }, []);

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  if (!activeToast) return null;

  const { achievement, totalUnlocked } = activeToast;
  const IconComponent = ICON_MAP[achievement.icon] || Trophy;

  return (
    <AnimatePresence>
      <div className="fixed bottom-5 right-5 z-[130] p-3 max-w-sm w-full pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative bg-slate-950/95 border-2 border-amber-400/70 rounded-2xl p-4 shadow-[0_0_40px_rgba(250,204,21,0.3)] overflow-hidden"
        >
          {/* Shimmer accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-400" />

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-500/15 border border-amber-400/50 rounded-xl text-amber-400 shrink-0 shadow-inner">
              <IconComponent size={24} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-extrabold text-amber-400 uppercase tracking-wider">
                  <Sparkles size={11} className="text-amber-300" /> ACHIEVEMENT UNLOCKED
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  +{achievement.xp} XP
                </span>
              </div>

              <h4 className="font-extrabold text-white text-sm tracking-tight mt-1 truncate">
                {achievement.title}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                {achievement.description}
              </p>

              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10 text-[11px] font-mono text-slate-400">
                <span>
                  Cabinet Progress: <strong className="text-amber-400">{totalUnlocked} / {ACHIEVEMENTS.length}</strong>
                </span>
                <button
                  onClick={() => {
                    setActiveToast(null);
                    window.dispatchEvent(new CustomEvent('open-achievement-cabinet'));
                  }}
                  className="text-cyan-400 hover:underline font-bold"
                >
                  View Cabinet →
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveToast(null)}
              aria-label="Dismiss achievement popup"
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
