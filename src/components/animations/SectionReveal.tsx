import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface SectionRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function SectionReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  once = true,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 40, scale: 0.94, rotateX: 8 };
      case 'down':
        return { y: -40, scale: 0.94, rotateX: -8 };
      case 'left':
        return { x: 40, scale: 0.94 };
      case 'right':
        return { x: -40, scale: 0.94 };
      case 'none':
      default:
        return { x: 0, y: 0, scale: 0.94 };
    }
  };

  const initialOffset = getDirectionOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
