import { useState, useEffect } from 'react';
import { Code2, Award } from 'lucide-react';
import SectionReveal from './animations/SectionReveal';
import TiltCard from './animations/TiltCard';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';

const Stats = () => {
  const [stats, setStats] = useState({
    repositories: 12,
    followers: 5,
    contributions: 150,
    experience: 2,
    isLive: false,
  });

  useEffect(() => {
    // Fetch GitHub stats
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/adityashm', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(prev => ({
            ...prev,
            repositories: data.public_repos || 12,
            followers: data.followers || 5,
            isLive: true,
          }));
        }
      } catch {
        console.log('Using default stats');
      }
    };

    fetchGitHubStats();
  }, []);

  const statCards = [
    {
      icon: Code2,
      label: 'Projects & Demos',
      value: stats.repositories,
      glowColor: 'cyan' as const,
      iconColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.25)]',
    },
    {
      icon: Award,
      label: 'LeetCode DSA Solved',
      value: 250,
      glowColor: 'amber' as const,
      iconColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    },
    {
      icon: Award,
      label: 'Years Experience',
      value: stats.experience,
      glowColor: 'cyan' as const,
      iconColor: 'text-sky-400 bg-sky-950/60 border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.25)]',
    },
    {
      icon: Code2,
      label: 'Contributions',
      value: stats.contributions,
      glowColor: 'emerald' as const,
      iconColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
    }
  ];

  return (
    <section className="py-24 relative z-10 bg-transparent text-white" aria-label="Key Statistics">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <SectionReveal direction="up">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
              <span className={`w-2 h-2 rounded-full ${stats.isLive ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
              {stats.isLive ? 'Live GitHub Metrics' : 'Verified Overview Metrics'}
            </span>
          </div>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={index}>
                <TiltCard glowColor={stat.glowColor} className="p-6 text-center border border-white/10 hover:border-cyan-400/40 shadow-2xl">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl border flex items-center justify-center ${stat.iconColor}`}>
                    <Icon size={28} />
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-2 tracking-tight">
                    {stat.value}+
                  </div>
                  <p className="text-slate-300 text-sm md:text-base font-bold tracking-wide">
                    {stat.label}
                  </p>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Stats;