import React, { useState, useCallback, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Github, 
  ExternalLink, 
  Flame, 
  TrendingDown, 
  Wallet, 
  BarChart3, 
  Terminal, 
  Server,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Code2
} from 'lucide-react';
import { ProjectData } from '../types/project';
import TechnologyBadge from './TechnologyBadge';

interface ExpandingProjectCardsProps {
  projects: ProjectData[];
}

// Icon helper corresponding to project domain
const getProjectIcon = (title: string, index: number) => {
  const lower = title.toLowerCase();
  if (lower.includes('fire') || lower.includes('multifire')) return Flame;
  if (lower.includes('price') || lower.includes('deal')) return TrendingDown;
  if (lower.includes('expense') || lower.includes('budget')) return Wallet;
  if (lower.includes('dashboard') || lower.includes('analysis')) return BarChart3;
  if (lower.includes('scraper')) return Terminal;
  if (lower.includes('api') || lower.includes('backend')) return Server;

  const fallbackIcons = [Flame, TrendingDown, Wallet, BarChart3, Terminal, Server];
  return fallbackIcons[index % fallbackIcons.length] || Code2;
};

const ExpandingProjectCards: React.FC<ExpandingProjectCardsProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();
  const componentId = useId();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveIndex(index);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % projects.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    },
    [projects.length]
  );

  const springTransition = prefersReducedMotion
    ? { duration: 0.1 }
    : {
        type: 'spring',
        stiffness: 160,
        damping: 26,
        mass: 1,
      };

  return (
    <div className="w-full">
      {/* ── DESKTOP ACCORDION (hidden on mobile, visible md+) ────────────────── */}
      <div 
        className="hidden md:flex flex-row items-stretch gap-3.5 h-[530px] w-full select-none"
        role="tablist"
        aria-label="Expanding Projects Showcase"
      >
        {projects.map((project, index) => {
          const isActive = activeIndex === index;
          const Icon = getProjectIcon(project.title, index);
          const indexFormatted = String(index + 1).padStart(2, '0');
          const isInternalLink = project.live?.startsWith('/');
          const hasLive = project.live && project.live !== '#';

          return (
            <motion.div
              key={project.title}
              role="tab"
              id={`${componentId}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${componentId}-panel-${index}`}
              tabIndex={0}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              layout
              transition={springTransition}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 ${
                isActive
                  ? 'flex-[5_5_0%] shadow-[0_0_35px_rgba(0,240,255,0.22)] border border-cyan-400/50 bg-slate-950/90'
                  : 'flex-[0_0_80px] lg:flex-[0_0_88px] border border-white/10 hover:border-cyan-400/40 bg-slate-950/70 hover:bg-slate-900/90 group'
              }`}
            >
              {/* Card Background Image & Subtle Grain Gradient */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                    isActive
                      ? 'scale-105 opacity-35 filter brightness-95'
                      : 'opacity-15 group-hover:opacity-30 group-hover:scale-110 filter blur-[1px]'
                  }`}
                />
                {/* Dynamic Vignette & Dark Cosmic Tint */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-t from-[#030712] via-[#030712]/80 to-[#030712]/30' 
                      : 'bg-[#030712]/85 group-hover:bg-[#030712]/75'
                  }`}
                />
              </div>

              {/* ── COLLAPSED VIEW (when card is not active) ── */}
              {!isActive && (
                <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-6 px-2">
                  {/* Top Index Badge */}
                  <span className="font-mono text-xs font-bold text-cyan-400/80 bg-cyan-950/50 border border-cyan-500/20 px-2 py-1 rounded-full group-hover:text-cyan-300 group-hover:border-cyan-400/40 transition-colors">
                    {indexFormatted}
                  </span>

                  {/* Vertical Rotated Title */}
                  <div className="flex-1 flex items-center justify-center my-4 overflow-hidden">
                    <p className="[writing-mode:vertical-rl] rotate-180 text-sm font-semibold tracking-wider text-slate-300 group-hover:text-white transition-colors uppercase whitespace-nowrap truncate max-h-[260px]">
                      {project.title}
                    </p>
                  </div>

                  {/* Bottom Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all shadow-sm">
                    <Icon size={18} />
                  </div>
                </div>
              )}

              {/* ── EXPANDED VIEW (when card is active) ── */}
              {isActive && (
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 lg:p-9"
                >
                  {/* Top Header with Status Pill and Index */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-sm font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-400/40 px-3 py-1 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.25)] flex items-center gap-1.5">
                        <Sparkles size={13} className="text-cyan-400" />
                        {indexFormatted} / {String(projects.length).padStart(2, '0')}
                      </span>
                      {index === 0 && (
                        <span className="text-[11px] font-semibold tracking-wider uppercase bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border border-orange-500/40 px-2.5 py-0.5 rounded-full">
                          Featured Showcase
                        </span>
                      )}
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <span>Card {index + 1} of {projects.length}</span>
                    </div>
                  </div>

                  {/* Bottom Project Details */}
                  <div className="space-y-4 max-w-2xl">
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow-md">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech) => (
                        <TechnologyBadge key={tech} technology={tech} />
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-2">
                      {hasLive && (
                        isInternalLink ? (
                          <Link
                            to={project.live}
                            aria-label={`View live interactive demo for ${project.title}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_28px_rgba(0,240,255,0.55)] transition-all transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                          >
                            <span>Live Demo</span>
                            <ArrowRight size={16} />
                          </Link>
                        ) : (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open live site for ${project.title} in new tab`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_28px_rgba(0,240,255,0.55)] transition-all transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                          >
                            <span>Live Site</span>
                            <ExternalLink size={16} />
                          </a>
                        )
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View GitHub repository for ${project.title}`}
                          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-cyan-400/40 text-sm font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        >
                          <Github size={17} />
                          <span>Repository</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── MOBILE ACCORDION (hidden on desktop, visible on screens < md) ─────── */}
      <div 
        className="flex md:hidden flex-col gap-3 w-full"
        role="tablist"
        aria-label="Expanding Projects Accordion"
      >
        {projects.map((project, index) => {
          const isActive = activeIndex === index;
          const Icon = getProjectIcon(project.title, index);
          const indexFormatted = String(index + 1).padStart(2, '0');
          const isInternalLink = project.live?.startsWith('/');
          const hasLive = project.live && project.live !== '#';

          return (
            <motion.div
              key={project.title}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => setActiveIndex(isActive ? -1 : index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              layout
              transition={springTransition}
              className={`rounded-2xl overflow-hidden transition-all duration-300 border ${
                isActive
                  ? 'border-cyan-400/60 bg-slate-950/95 shadow-[0_0_25px_rgba(0,240,255,0.2)]'
                  : 'border-white/10 bg-slate-900/60 hover:border-cyan-400/30'
              }`}
            >
              {/* Header Strip (always visible on mobile) */}
              <button
                type="button"
                aria-expanded={isActive}
                className="w-full flex items-center justify-between p-4 min-h-[58px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                    {indexFormatted}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/5 text-cyan-300">
                    <Icon size={16} />
                  </div>
                  <span className="font-bold text-sm text-white line-clamp-1">
                    {project.title}
                  </span>
                </div>

                <div 
                  className={`p-1 text-slate-400 transition-transform duration-300 ${
                    isActive ? 'rotate-180 text-cyan-400' : ''
                  }`}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              {/* Collapsible Content */}
              {isActive && (
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-5 pt-1 space-y-4"
                >
                  {/* Project Image Preview */}
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <TechnologyBadge key={tech} technology={tech} />
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2.5 pt-2">
                    {hasLive && (
                      isInternalLink ? (
                        <Link
                          to={project.live}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 min-h-[44px] bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold rounded-xl shadow-md"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={14} />
                        </Link>
                      ) : (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 min-h-[44px] bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold rounded-xl shadow-md"
                        >
                          <span>Live Site</span>
                          <ExternalLink size={14} />
                        </a>
                      )
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 min-h-[44px] bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-white/10"
                      >
                        <Github size={15} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── DESKTOP NAVIGATION PILLS & COUNTER ──────────────────────────────── */}
      <div className="hidden md:flex items-center justify-between mt-6 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-mono text-cyan-400 font-medium">Click any card to expand</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Keyboard navigation: Arrow keys</span>
        </div>

        {/* Quick dot selectors */}
        <div className="flex items-center gap-2">
          {projects.map((p, idx) => (
            <button
              key={p.title}
              type="button"
              aria-label={`Jump to project ${idx + 1}: ${p.title}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-8 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandingProjectCards;
