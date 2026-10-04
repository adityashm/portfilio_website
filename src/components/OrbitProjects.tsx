import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Sparkles, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { ProjectData } from '../types/project';

interface OrbitProjectsProps {
  projects: ProjectData[];
  leftTitle?: string;
  rightTitle?: string;
  centerText?: string;
  scrollLengthVh?: number;
}

// Math helpers
function clamp(val: number, min = 0, max = 1): number {
  return Math.min(Math.max(val, min), max);
}


// Card Content Component
interface CardContentProps {
  project: ProjectData;
  index: number;
  isActive: boolean;
}

const CardContent: React.FC<CardContentProps> = ({ project, index, isActive }) => {
  const isInternal = project.live?.startsWith('/');
  const hasLive = project.live && project.live !== '#';

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-2xl bg-slate-950/90 border transition-all duration-500 flex flex-col justify-between ${
      isActive 
        ? 'border-cyan-400/60 shadow-[0_0_35px_rgba(0,240,255,0.3)] ring-1 ring-cyan-400/30' 
        : 'border-white/10 hover:border-cyan-400/30 shadow-[0_12px_35px_rgba(0,0,0,0.7)]'
    }`}>
      {/* Background Image Preview */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          draggable={false}
          loading="eager"
          className={`w-full h-full object-cover transition-transform duration-700 select-none ${
            isActive ? 'scale-105 opacity-40' : 'opacity-25 filter blur-[0.5px]'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30 pointer-events-none" />
      </div>

      {/* Card Header: Index & Tech Badges */}
      <div className="relative z-10 p-5 pb-0 flex items-center justify-between gap-3">
        <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md border transition-colors ${
          isActive 
            ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.25)]' 
            : 'bg-slate-900/80 text-slate-400 border-white/10'
        }`}>
          {String(index + 1).padStart(2, '0')} / {String(6).padStart(2, '0')}
        </span>

        <div className="flex flex-wrap gap-1.5 justify-end">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900/80 text-cyan-200/90 border border-cyan-400/20 backdrop-blur-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Body: Title & Description */}
      <div className="relative z-10 p-5 pt-3">
        <h3 className={`text-lg md:text-xl font-bold tracking-tight mb-2 transition-colors ${
          isActive ? 'text-white' : 'text-slate-200'
        }`}>
          {project.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-300/90 line-clamp-3 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
          {hasLive && (
            isInternal ? (
              <Link
                to={project.live}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Demo</span>
              </Link>
            ) : (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Live</span>
              </a>
            )
          )}

          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white border border-white/10 hover:border-cyan-400/40 transition-all"
              aria-label={`GitHub repo for ${project.title}`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const OrbitProjects: React.FC<OrbitProjectsProps> = ({
  projects,
  scrollLengthVh = 220,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Smooth scroll-driven active index progression (allows seeing all projects slowly as you scroll)
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Calculate progress from 0 (when top of section reaches top of screen) to 1 (when bottom reaches bottom)
      const currentScroll = -rect.top;
      const rawProgress = clamp(currentScroll / totalScrollable, 0, 1);

      // Map progress to project index: 0, 1, 2, 3, 4, 5
      const targetIndex = Math.min(
        Math.floor(rawProgress * projects.length),
        projects.length - 1
      );
      setActiveIndex(targetIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length, isMobile]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  }, [projects.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      ref={rootRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: isMobile ? 'auto' : `${scrollLengthVh}vh`,
        background: 'transparent',
      }}
      className="text-white"
    >
      {/* Sticky Fullscreen 3D Stage on Desktop, standard section on Mobile */}
      <div className={`${isMobile ? 'py-16 px-4' : 'sticky top-0 h-[100svh] min-h-[640px] flex flex-col justify-between overflow-hidden'} w-full`}>
        {/* Background Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,_rgba(0,240,255,0.08)_0%,_transparent_70%)]" />

        {/* ── Section Header (ALWAYS VISIBLE - NO BLANK SCREEN) ────────────────── */}
        <div className="relative z-20 text-center pt-8 md:pt-10 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Layers className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-2">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Scroll or use arrows to slowly explore production systems, autonomous telemetry, and full-stack software.
          </p>
        </div>

        {/* ── 3D Interactive Stage (Desktop: 3D Arc / Cylinder; Mobile: Stack) ─── */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-4">
          {!isMobile ? (
            /* Desktop 3D Perspective Stage */
            <div 
              style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-5xl h-[380px] md:h-[420px] flex items-center justify-center"
            >
              {projects.map((project, index) => {
                const offset = index - activeIndex;
                const isActive = offset === 0;

                // 3D positioning along curved cylindrical stage
                const angle = offset * 28; // degrees
                const radians = (angle * Math.PI) / 180;
                const translateX = Math.sin(radians) * 440;
                const translateZ = -Math.abs(offset) * 45 - (1 - Math.cos(radians)) * 320;
                const rotateY = -angle * 0.75;
                const scale = clamp(1 - Math.abs(offset) * 0.12, 0.65, 1);
                const opacity = clamp(1 - Math.abs(offset) * 0.28, 0.2, 1);
                const zIndex = 100 - Math.abs(offset) * 10;

                // Visible range: show items within ±3 distance
                const isVisible = Math.abs(offset) <= 3;
                if (!isVisible) return null;

                return (
                  <div
                    key={project.title}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      position: 'absolute',
                      width: '420px',
                      height: '350px',
                      zIndex,
                      opacity,
                      transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease',
                      cursor: isActive ? 'default' : 'pointer',
                    }}
                    className="will-change-transform"
                  >
                    <CardContent project={project} index={index} isActive={isActive} />
                  </div>
                );
              })}
            </div>
          ) : (
            /* Mobile Stack / Grid */
            <div className="w-full flex flex-col gap-6 max-w-md mx-auto">
              {projects.map((project, index) => (
                <div key={project.title} className="w-full h-[360px]">
                  <CardContent project={project} index={index} isActive={true} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Desktop Interactive Navigation Controls (Arrows & Numbered Pills) ── */}
        {!isMobile && (
          <div className="relative z-20 pb-8 px-6 max-w-4xl mx-auto w-full flex flex-col items-center gap-3.5">
            {/* Arrows & Quick Indicator */}
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/40 transition-all active:scale-95 shadow-sm"
              >
                <ChevronLeft size={16} />
                <span>Prev Project</span>
              </button>

              {/* Numbered Pills for instant jump to any project */}
              <div className="flex items-center gap-2">
                {projects.map((p, idx) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Jump to project ${idx + 1}: ${p.title}`}
                    className={`font-mono text-xs px-2.5 py-1 rounded-lg transition-all ${
                      activeIndex === idx
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.5)] scale-105'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/40 transition-all active:scale-95 shadow-sm"
              >
                <span>Next Project</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Subtle Hint */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="text-cyan-400 font-semibold">Tip:</span>
              <span>Scroll down slowly or use arrow keys / buttons to cycle projects</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrbitProjects;
