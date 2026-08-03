import { Award, ExternalLink } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';
import SectionReveal from './animations/SectionReveal';
import TiltCard from './animations/TiltCard';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative z-10 bg-transparent text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <SectionReveal direction="up">
          <div className="text-center mb-12">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
              VERIFIED CREDENTIALS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
              Certifications & Trainings
            </h2>
          </div>
        </SectionReveal>

        <StaggerContainer className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.map((cert, index) => (
            <StaggerItem key={index} className="h-full">
              <TiltCard glowColor="violet" className="p-6 h-full border border-white/10 hover:border-violet-500/40">
                <div className="flex items-start gap-4 h-full">
                  <div className="p-2.5 bg-violet-950/60 border border-violet-500/30 text-violet-400 rounded-xl shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-base md:text-lg font-extrabold text-white mb-1 break-words tracking-tight">
                        {cert.title}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-400 mb-1">
                        {cert.issuer}
                      </p>
                      <p className="text-xs font-mono text-slate-400 mb-3">
                        {cert.date}
                      </p>
                    </div>
                    {cert.link && cert.link !== '#' && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:underline transition-colors mt-2 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded"
                      >
                        <span>View Certificate</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Certifications;
