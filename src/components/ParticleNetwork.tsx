import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface ParticleNetworkProps {
  particleCount?: number;
  className?: string;
}

const ParticleNetwork = ({ particleCount = 70, className = '' }: ParticleNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, [particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initParticles(canvas.width, canvas.height);
    };

    setSize();

    const resizeObserver = new ResizeObserver(setSize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const MAX_DIST = 130;
    const MOUSE_RADIUS = 120;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const dotColor = isDark ? '96, 165, 250' : '37, 99, 235'; // blue-400 : blue-600
      const lineColor = isDark ? '148, 163, 184' : '100, 116, 139'; // slate-400 : slate-500

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Mouse connection
        const dxm = particles[i].x - mouse.x;
        const dym = particles[i].y - mouse.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < MOUSE_RADIUS * 1.2) {
          const alpha = (1 - dm / (MOUSE_RADIUS * 1.2)) * 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${dotColor}, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      aria-hidden="true"
    />
  );
};

export default ParticleNetwork;
