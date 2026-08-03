import { Briefcase } from 'lucide-react';
import { ExperienceData } from '../types/experience';

const ExperienceCard = ({ title, company, period, description }: ExperienceData) => {
  return (
    <article className="relative mb-8 glass-card-cosmic rounded-2xl p-5 md:p-6 border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all duration-300">
      {/* Glowing Timeline Node Pin */}
      <span className="absolute -left-6 md:-left-10 top-7 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.9)] border-2 border-slate-950 z-10" />

      <div className="flex items-start gap-4">
        <div className="p-3 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 rounded-xl shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
          <Briefcase className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight break-words">
            {title}
          </h3>
          <p className="text-cyan-400 font-semibold text-sm md:text-base tracking-wide mt-0.5">
            {company}
          </p>
          <div className="inline-block text-xs font-mono text-violet-300 bg-violet-950/50 border border-violet-500/30 px-3 py-1 rounded-full my-2 shadow-[0_0_8px_rgba(139,92,246,0.2)]">
            {period}
          </div>
          <ul className="mt-3 text-slate-300 text-xs md:text-sm leading-relaxed space-y-2">
            {description.map((item, index) => (
              <li key={index} className="flex items-start gap-2 break-words">
                <span className="text-cyan-400 font-bold mt-1 text-xs">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;