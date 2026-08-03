import { Code2, Brain, Coffee } from 'lucide-react';
import { aboutCardsData, aboutBioData } from '../data/portfolioData';
import SectionReveal from './animations/SectionReveal';
import TiltCard from './animations/TiltCard';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';

const iconMap = {
  Code2: Code2,
  Brain: Brain,
  Coffee: Coffee,
};

const iconColors = [
  'text-cyan-400 bg-cyan-950/60 border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.25)]',
  'text-violet-400 bg-violet-950/60 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.25)]',
  'text-sky-400 bg-sky-950/60 border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.25)]',
];

const About = () => {
  return (
    <section id="about" className="py-24 relative z-10 bg-transparent text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionReveal direction="up">
          <div className="text-center mb-12">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
              DISCOVER MY PASSION
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
              About Me
            </h2>
          </div>
        </SectionReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {aboutCardsData.map((card, index) => {
            const IconComponent = iconMap[card.iconName];
            const colorClass = iconColors[index % iconColors.length];
            return (
              <StaggerItem key={index}>
                <TiltCard glowColor={index === 1 ? 'violet' : 'cyan'} className="p-6 h-full border border-white/10 hover:border-cyan-400/40">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colorClass}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    {card.description}
                  </p>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <SectionReveal delay={0.2} direction="up">
          <div className="mt-12 p-6 md:p-8 glass-card-cosmic rounded-2xl border border-white/10 border-t-2 border-t-cyan-500/60 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
            <p className="text-slate-300 leading-relaxed text-base md:text-lg font-sans">
              {aboutBioData[0]}
              <br /><br />
              {aboutBioData[1]}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default About;