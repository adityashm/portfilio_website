import { Code2, Database, Cloud, Layout, Terminal, GitBranch } from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import SectionReveal from './animations/SectionReveal';
import TiltCard from './animations/TiltCard';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';

const iconMap = {
  Code2: Code2,
  Layout: Layout,
  Database: Database,
  Cloud: Cloud,
  Terminal: Terminal,
  GitBranch: GitBranch,
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative z-10 bg-transparent text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionReveal direction="up">
          <div className="text-center mb-12">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
              TECHNICAL PROFICIENCY
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
              Skills & Technologies
            </h2>
          </div>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => {
            const IconComponent = iconMap[category.iconName];
            return (
              <StaggerItem key={index}>
                <TiltCard glowColor="violet" className="p-6 h-full border border-white/10 hover:border-violet-500/40">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-violet-950/60 border border-violet-500/30 text-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.25)]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-extrabold text-white tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="badge-tech"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Skills;
