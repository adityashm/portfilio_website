import { GraduationCap } from 'lucide-react';
import SectionReveal from './animations/SectionReveal';
import TiltCard from './animations/TiltCard';

const Education = () => {
  return (
    <section id="education" className="py-24 relative z-10 bg-transparent text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionReveal direction="up">
          <div className="text-center mb-12">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
              ACADEMIC BACKGROUND
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
              Education
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1} direction="up" className="max-w-3xl mx-auto">
          <TiltCard glowColor="cyan" className="p-6 md:p-8 border border-white/10 hover:border-cyan-400/50 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start gap-5">
              <div className="p-3.5 bg-cyan-950/60 border border-cyan-500/30 rounded-xl text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)] shrink-0">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  Bachelor of Technology - BTech, Computer Science
                </h3>
                <p className="text-cyan-300 font-semibold tracking-wide mt-1 text-sm md:text-base">
                  IMS ENGINEERING COLLEGE, GHAZIABAD
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 my-3 shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                  2023 - 2027
                </div>
                <ul className="mt-2 text-slate-300 text-sm md:text-base space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)] inline-block" />
                    <span>CGPA: 8.6/10</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)] inline-block" />
                    <span>Member of Technical Society</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)] inline-block" />
                    <span>Active participant in coding competitions</span>
                  </li>
                </ul>
              </div>
            </div>
          </TiltCard>
        </SectionReveal>
      </div>
    </section>
  );
};

export default Education;