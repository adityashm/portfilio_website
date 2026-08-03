import { Github, Code2, Users } from 'lucide-react';
import SectionReveal from './animations/SectionReveal';
import TiltCard from './animations/TiltCard';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';

const GitHubStats = () => {
  return (
    <section className="py-20 relative z-10 bg-transparent text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionReveal direction="up">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="p-3 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 rounded-2xl shadow-[0_0_15px_rgba(0,240,255,0.25)]">
              <Github className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block">
                OPEN SOURCE WORK
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
                GitHub Profile
              </h2>
            </div>
          </div>
        </SectionReveal>

        <StaggerContainer className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GitHub Profile Card */}
          <StaggerItem className="h-full">
            <TiltCard glowColor="cyan" className="p-6 md:p-8 h-full border border-white/10 hover:border-cyan-400/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white hover:text-cyan-300 transition-colors">
                      @adityashm
                    </h3>
                    <p className="text-cyan-400 text-sm font-semibold mt-0.5">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                  Open source projects and contributions in Python, React, FastAPI, and Web Development.
                </p>
              </div>

              <div>
                <a
                  href="https://github.com/adityashm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
                >
                  <Github size={20} />
                  <span>Visit Profile</span>
                </a>
              </div>
            </TiltCard>
          </StaggerItem>

          {/* Quick Stats */}
          <StaggerItem className="h-full">
            <TiltCard glowColor="violet" className="p-6 md:p-8 h-full border border-white/10 hover:border-violet-400/40 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-6 tracking-tight">
                  Projects & Contributions
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 rounded-xl shrink-0 mt-1 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Projects</p>
                      <p className="font-bold text-white text-base leading-snug">
                        Data Analysis Dashboard, REST API, Web Scraper & More
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-violet-950/60 border border-violet-500/30 text-violet-400 rounded-xl shrink-0 mt-1 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Technologies</p>
                      <p className="font-bold text-white text-base leading-snug">
                        Python, React, FastAPI, TypeScript
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default GitHubStats;
