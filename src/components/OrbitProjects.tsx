import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Sparkles, Layers } from 'lucide-react';
import { ProjectData } from '../types/project';

interface OrbitProjectsProps {
  projects: ProjectData[];
  leftTitle?: string;
  rightTitle?: string;
  centerText?: string;
  scrollLengthVh?: number;
}

// Math interpolation helpers from Framer Orbit engine
function clamp(value: number, minimum = 0, maximum = 1): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

function smootherstep(start: number, end: number, value: number): number {
  if (start === end) {
    return value < start ? 0 : 1;
  }
  const progress = clamp((value - start) / (end - start));
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}

// Card Inner Content Component
interface CardContentProps {
  project: ProjectData;
  index: number;
  renderQuality?: number;
}

const CardContent: React.FC<CardContentProps> = ({
  project,
  index,
}) => {
  const isInternal = project.live?.startsWith('/');

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-slate-950/85 border border-cyan-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.7)] group hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-all duration-300">
      {/* Background Project Image */}
      <img
        src={project.image}
        alt={project.title}
        draggable={false}
        loading="eager"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
      />

      {/* Cybernetic Grid & Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

      {/* Card Header: Index & Tech Badges */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-900/90 text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex flex-wrap gap-1.5 justify-end max-w-[75%]">
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

      {/* Card Bottom: Title, Description, and Quick Actions */}
      <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 flex flex-col justify-end z-10">
        <h3 className="text-base md:text-lg font-bold text-white tracking-tight mb-1 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
          {project.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-300/90 line-clamp-2 mb-3 leading-relaxed">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/10">
          {/* Main Action Link */}
          {isInternal ? (
            <Link
              to={project.live}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Demo</span>
            </Link>
          ) : (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit Live</span>
            </a>
          )}

          {/* GitHub Repo Button */}
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white border border-white/10 hover:border-cyan-400/40 transition-all"
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

// 3D Desktop Card Component
interface DesktopProjectCardProps {
  project: ProjectData;
  index: number;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
  opacity: number;
  zIndex: number;
  renderQuality?: number;
}

const DesktopProjectCard: React.FC<DesktopProjectCardProps> = ({
  project,
  index,
  x,
  y,
  z,
  width,
  height,
  rotateY,
  rotateZ,
  scale,
  opacity,
  zIndex,
  renderQuality = 1.75,
}) => {
  const isInternal = project.live?.startsWith('/');

  // High-DPI compensation to preserve texture crispness under 3D perspective
  const quality = clamp(renderQuality, 1, 2.5);
  const renderWidth = width * quality;
  const renderHeight = height * quality;
  const renderX = x - (renderWidth - width) / 2;
  const renderY = y - (renderHeight - height) / 2;
  const renderScale = scale / quality;

  const cardStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: renderWidth,
    height: renderHeight,
    opacity,
    zIndex,
    transformOrigin: '50% 50%',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transform: `
      translate3d(${renderX}px, ${renderY}px, ${z}px)
      rotateY(${rotateY}deg)
      rotateZ(${rotateZ}deg)
      scale(${renderScale})
    `,
    transition: 'opacity 0.15s ease-out',
    pointerEvents: opacity < 0.2 ? 'none' : 'auto',
  };

  const content = (
    <CardContent
      project={project}
      index={index}
      renderQuality={quality}
    />
  );

  return (
    <div style={cardStyle}>
      {isInternal ? (
        <Link
          to={project.live}
          className="block w-full h-full text-inherit no-underline cursor-pointer"
          aria-label={`Open ${project.title}`}
        >
          {content}
        </Link>
      ) : (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full text-inherit no-underline cursor-pointer"
          aria-label={`Open ${project.title}`}
        >
          {content}
        </a>
      )}
    </div>
  );
};

// Compact Responsive Layout for Mobile/Tablet (< 1024px)
interface CompactLayoutProps {
  projects: ProjectData[];
  leftTitle: string;
  rightTitle: string;
  centerText: string;
}

const CompactLayout: React.FC<CompactLayoutProps> = ({
  projects,
  leftTitle,
  rightTitle,
  centerText,
}) => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <Layers className="w-3.5 h-3.5" />
          <span>PORTFOLIO SHOWCASE</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
            {leftTitle} {rightTitle}
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {centerText}
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <div key={project.title} className="w-full aspect-[1.5/1]">
            <CardContent
              project={project}
              index={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// Main OrbitProjects Component
export const OrbitProjects: React.FC<OrbitProjectsProps> = ({
  projects,
  leftTitle = 'FEATURED',
  rightTitle = 'PROJECTS',
  centerText = 'Production platforms, autonomous telemetry, and cloud systems engineered with high performance.',
  scrollLengthVh = 400,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const [progress, setProgress] = useState(0);
  const [isNearViewport, setIsNearViewport] = useState(false);

  const targetProgressRef = useRef(0);
  const animatedProgressRef = useRef(0);
  const progressRafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);

  // Measure viewport size reactively
  useLayoutEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    let frameA: number | null = null;
    let frameB: number | null = null;

    const measure = () => {
      const bounds = element.getBoundingClientRect();
      const width = Math.max(Math.round(bounds.width), 1);
      const height = Math.max(Math.round(bounds.height), 1);

      setViewport((prev) => {
        if (Math.abs(prev.width - width) < 1 && Math.abs(prev.height - height) < 1) {
          return prev;
        }
        return { width, height };
      });
    };

    measure();
    frameA = window.requestAnimationFrame(() => {
      measure();
      frameB = window.requestAnimationFrame(measure);
    });

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => {
      if (frameA !== null) window.cancelAnimationFrame(frameA);
      if (frameB !== null) window.cancelAnimationFrame(frameB);
      observer.disconnect();
    };
  }, []);

  const isCompact = viewport.width < 1024;

  // Wake scroll loop only when in or near viewport
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isCompact) {
      setIsNearViewport(true);
      return;
    }

    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      { root: null, rootMargin: '100% 0px 100% 0px', threshold: 0 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [isCompact]);

  // Smooth exponential dampening scroll interpolation loop
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (progressRafRef.current !== null) {
      window.cancelAnimationFrame(progressRafRef.current);
      progressRafRef.current = null;
    }
    lastFrameTimeRef.current = null;

    if (isCompact) {
      targetProgressRef.current = 1;
      animatedProgressRef.current = 1;
      setProgress(1);
      return;
    }

    if (!isNearViewport) {
      targetProgressRef.current = progress;
      animatedProgressRef.current = progress;
      return;
    }

    const animateProgress = (time: number) => {
      progressRafRef.current = null;
      const previousTime = lastFrameTimeRef.current ?? time;
      const deltaSeconds = Math.min(Math.max((time - previousTime) / 1000, 0), 0.064);
      lastFrameTimeRef.current = time;

      const current = animatedProgressRef.current;
      const target = targetProgressRef.current;
      const dampingRate = 7;
      const interpolation = 1 - Math.exp(-dampingRate * deltaSeconds);
      const next = current + (target - current) * interpolation;
      const difference = Math.abs(target - next);
      const finalProgress = difference < 0.0001 ? target : next;

      animatedProgressRef.current = finalProgress;
      setProgress(finalProgress);

      if (difference >= 0.0001) {
        progressRafRef.current = window.requestAnimationFrame(animateProgress);
      } else {
        lastFrameTimeRef.current = null;
      }
    };

    const updateTargetProgress = () => {
      const root = rootRef.current;
      if (!root) return;

      const bounds = root.getBoundingClientRect();
      const entryLead = window.innerHeight * 0.45; // Start earlier for seamless entry
      const availableDistance = Math.max(bounds.height - window.innerHeight, 1);
      targetProgressRef.current = clamp((entryLead - bounds.top) / availableDistance);

      if (progressRafRef.current === null) {
        progressRafRef.current = window.requestAnimationFrame(animateProgress);
      }
    };

    updateTargetProgress();
    window.addEventListener('scroll', updateTargetProgress, { passive: true });
    window.addEventListener('resize', updateTargetProgress);

    return () => {
      if (progressRafRef.current !== null) {
        window.cancelAnimationFrame(progressRafRef.current);
      }
      progressRafRef.current = null;
      lastFrameTimeRef.current = null;
      window.removeEventListener('scroll', updateTargetProgress);
      window.removeEventListener('resize', updateTargetProgress);
    };
  }, [isCompact, isNearViewport, progress]);

  // If on mobile or tablet, render responsive compact grid
  if (isCompact) {
    return (
      <div ref={viewportRef} className="w-full relative z-10 bg-transparent text-white">
        <CompactLayout
          projects={projects}
          leftTitle={leftTitle}
          rightTitle={rightTitle}
          centerText={centerText}
        />
      </div>
    );
  }

  // 3D Geometry Calculation for Desktop
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const itemCount = projects.length;

  const desktopColumns = 3;
  const gridGap = 20;
  const gridMaxWidth = 1220;
  const gridPositionY = 53; // % from top in settled grid

  const availableGridWidth = Math.max(viewportWidth - 96, 200);
  const finalGridWidth = Math.min(gridMaxWidth, availableGridWidth);
  const finalCardWidth = Math.max(120, (finalGridWidth - gridGap * (desktopColumns - 1)) / desktopColumns);
  const cardAspect = 1.48;
  const finalCardHeight = finalCardWidth / cardAspect;
  const rows = Math.ceil(itemCount / desktopColumns);
  const finalGridHeight = rows * finalCardHeight + Math.max(rows - 1, 0) * gridGap;

  // Orbit 3D parameters
  const actualArcCardWidth = Math.min(410, viewportWidth * 0.28);
  const actualArcCardHeight = actualArcCardWidth / cardAspect;
  const actualCurveWidth = Math.min(580, viewportWidth * 0.44);
  const actualCurveHeight = Math.min(220, viewportHeight * 0.3);
  const actualDepth = Math.min(540, viewportWidth * 0.42);
  const orbitRotation = 300;
  const orbitOffsetY = -35;

  // Title Animations
  const titleEnterProgress = smootherstep(0, 0.2, progress);
  const titleExitProgress = smootherstep(0.72, 0.94, progress);
  const titleOpacity = titleEnterProgress * (1 - titleExitProgress);
  const titleVerticalShift = lerp(32, 0, titleEnterProgress);

  const safeCenterTextWidth = Math.min(280, viewportWidth * 0.45);
  const titleFinalOffset = (safeCenterTextWidth + 36) / 2;
  const titleOutsideOffset = viewportWidth * 0.65;
  const leftTitleOffset = lerp(titleOutsideOffset, titleFinalOffset, titleEnterProgress);
  const rightTitleOffset = lerp(titleOutsideOffset, titleFinalOffset, titleEnterProgress);

  const revealProgress = smootherstep(0, 0.17, progress);
  const orbitProgress = smootherstep(0.04, 0.72, progress);
  const centerCopyOpacity = smootherstep(0.12, 0.25, progress) * (1 - smootherstep(0.58, 0.82, progress));

  return (
    <section
      ref={rootRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `${scrollLengthVh}vh`,
        background: 'transparent',
      }}
      className="text-white"
    >
      <div
        ref={viewportRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100svh',
          minHeight: 650,
          overflow: 'hidden',
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          isolation: 'isolate',
        }}
        className="flex items-center justify-center bg-transparent"
      >
        {/* Ambient Cosmic Radial Glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(0, 240, 255, 0.08) 0%, rgba(3, 7, 18, 0) 70%)',
          }}
        />

        {/* Dynamic Titles */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '55%',
            zIndex: 0,
            width: 'max-content',
            pointerEvents: 'none',
            opacity: titleOpacity,
            transform: `
              translate3d(
                calc(-100% - ${leftTitleOffset}px),
                calc(-50% + ${titleVerticalShift}px),
                0
              )
            `,
            willChange: 'transform, opacity',
          }}
        >
          <div className="font-extrabold tracking-tighter text-6xl xl:text-8xl 2xl:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 select-none">
            {leftTitle}
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '41%',
            zIndex: 0,
            width: 'max-content',
            pointerEvents: 'none',
            opacity: titleOpacity,
            transform: `
              translate3d(
                ${rightTitleOffset}px,
                calc(-50% - ${titleVerticalShift}px),
                0
              )
            `,
            willChange: 'transform, opacity',
          }}
        >
          <div className="font-extrabold tracking-tighter text-6xl xl:text-8xl 2xl:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-white select-none">
            {rightTitle}
          </div>
        </div>

        {/* Center Subtitle Copy */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            zIndex: 2,
            width: safeCenterTextWidth,
            pointerEvents: 'none',
            opacity: centerCopyOpacity,
            transform: 'translate3d(-50%, -50%, 0)',
          }}
          className="text-center font-mono text-xs md:text-sm text-cyan-200/90 tracking-wide font-medium backdrop-blur-sm p-3 rounded-xl border border-cyan-500/20 bg-slate-950/40 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
        >
          {centerText}
        </div>

        {/* 3D Orbiting Cards Layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            transformStyle: 'preserve-3d',
          }}
        >
          {projects.map((project, index) => {
            const revealStart = 0.025 + index * 0.01;
            const revealEnd = 0.18 + index * 0.012;
            const cardReveal = smootherstep(revealStart, revealEnd, progress);

            const flattenStart = 0.55 + index * 0.009;
            const flattenEnd = Math.min(0.91 + index * 0.009, 0.99);
            const flattenProgress = smootherstep(flattenStart, flattenEnd, progress);

            const baseAngle = (index / Math.max(itemCount, 1)) * 360 - 125;
            const angle = baseAngle + orbitProgress * orbitRotation;
            const radians = (angle * Math.PI) / 180;

            const arcCenterX = Math.sin(radians) * actualCurveWidth;
            const arcCenterY =
              Math.cos(radians + 0.65) * actualCurveHeight - viewportHeight * 0.025 + orbitOffsetY;
            const arcZ = Math.cos(radians) * actualDepth;

            const normalizedDepth = clamp((arcZ + actualDepth) / Math.max(actualDepth * 2, 1));
            const arcScale = lerp(0.8, 1, normalizedDepth);
            const arcOpacity = lerp(0.25, 1, normalizedDepth);

            const arcRotateY = -Math.sin(radians) * 62;
            const arcRotateZ = -Math.sin(radians) * 8;

            const entranceOffset = (1 - cardReveal) * viewportHeight * 0.48;
            const arcLeft = arcCenterX - actualArcCardWidth / 2;
            const arcTop = arcCenterY - actualArcCardHeight / 2 + entranceOffset;

            // Target position in 3x2 settled grid
            const column = index % desktopColumns;
            const row = Math.floor(index / desktopColumns);

            const gridLeft = -finalGridWidth / 2 + column * (finalCardWidth + gridGap);
            const gridTop =
              viewportHeight * (gridPositionY / 100) -
              viewportHeight / 2 -
              finalGridHeight / 2 +
              row * (finalCardHeight + gridGap);

            // Interpolate from 3D Orbit into settled grid
            const width = lerp(actualArcCardWidth, finalCardWidth, flattenProgress);
            const height = lerp(actualArcCardHeight, finalCardHeight, flattenProgress);
            const x = lerp(arcLeft, gridLeft, flattenProgress);
            const y = lerp(arcTop, gridTop, flattenProgress);
            const z = lerp(arcZ, 0, flattenProgress);
            const rotateY = lerp(arcRotateY, 0, flattenProgress);
            const rotateZ = lerp(arcRotateZ, 0, flattenProgress);
            const scale = lerp(arcScale, 1, flattenProgress);
            const opacity = clamp(lerp(arcOpacity * cardReveal * revealProgress, 1, flattenProgress));
            const zIndex = flattenProgress > 0.86 ? 100 + index : Math.round(100 + normalizedDepth * 800);

            return (
              <DesktopProjectCard
                key={project.title}
                project={project}
                index={index}
                x={x}
                y={y}
                z={z}
                width={width}
                height={height}
                rotateY={rotateY}
                rotateZ={rotateZ}
                scale={scale}
                opacity={opacity}
                zIndex={zIndex}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OrbitProjects;
