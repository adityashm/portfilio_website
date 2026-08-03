export interface Achievement {
  id: string;
  title: string;
  description: string;
  hint: string;
  icon: string; // lucide icon identifier
  xp: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'system-architect',
    title: 'System Architect',
    description: 'Inspected a distributed architecture & data flow schematic diagram.',
    hint: 'Click "View System Architecture & Data Flow" on any project demo page.',
    icon: 'Cpu',
    xp: 250,
  },
  {
    id: 'stress-tester',
    title: 'Stress Tester',
    description: 'Ran a 100-request concurrency benchmark to measure p50/p95/p99 latency.',
    hint: 'Click "Run Load Test" on the REST API or Data Dashboard demo page.',
    icon: 'Zap',
    xp: 300,
  },
  {
    id: 'power-user',
    title: 'Power User',
    description: 'Launched the Cmd + K Command Palette shortcut modal.',
    hint: 'Press Cmd+K or Ctrl+K anywhere on the website.',
    icon: 'Terminal',
    xp: 150,
  },
  {
    id: 'recruiter-scout',
    title: 'Recruiter Scout',
    description: 'Previewed or downloaded Aditya Sharma\'s verified PDF Resume.',
    hint: 'Click "Preview Resume" or "Download PDF" in the header or hero section.',
    icon: 'FileText',
    xp: 200,
  },
  {
    id: 'demo-explorer',
    title: 'Full-Stack Explorer',
    description: 'Explored interactive full-stack sandbox project demos.',
    hint: 'Visit at least 2 project demo pages from the Projects section.',
    icon: 'Code',
    xp: 350,
  },
];

export const TOTAL_XP = ACHIEVEMENTS.reduce((sum, a) => sum + a.xp, 0);
