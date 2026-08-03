import { ReactNode, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  glowColor?: 'cyan' | 'violet' | 'emerald';
  onClick?: () => void;
}

const glowColorMap = {
  cyan: 'rgba(0, 240, 255, 0.18)',
  violet: 'rgba(139, 92, 246, 0.18)',
  emerald: 'rgba(16, 185, 129, 0.18)',
};

export default function TiltCard({
  children,
  className = '',
  tiltMaxAngle = 10,
  glowColor = 'cyan',
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [tiltMaxAngle, -tiltMaxAngle]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltMaxAngle, tiltMaxAngle]), {
    stiffness: 250,
    damping: 25,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([cx, cy]) =>
      `radial-gradient(350px circle at ${cx}px ${cy}px, ${glowColorMap[glowColor]}, transparent 80%)`
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    if (!shouldReduceMotion) {
      x.set(mouseXPos / width);
      y.set(mouseYPos / height);
    }

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
    glowOpacity.set(1);

    cardRef.current.style.setProperty('--mouse-x', `${mouseXPos}px`);
    cardRef.current.style.setProperty('--mouse-y', `${mouseYPos}px`);
    cardRef.current.style.setProperty('--glow-opacity', '1');
  };

  const handleMouseLeave = () => {
    if (!shouldReduceMotion) {
      x.set(0.5);
      y.set(0.5);
    }
    glowOpacity.set(0);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--glow-opacity', '0');
    }
  };

  if (shouldReduceMotion) {
    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`glass-card-cosmic rounded-2xl ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative glass-card-cosmic rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity: glowOpacity,
          background: glowBackground,
        }}
      />
      <div style={{ transform: 'translateZ(20px)' }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
