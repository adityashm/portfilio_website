import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectData } from '../types/project';
import TechnologyBadge from './TechnologyBadge';
import TiltCard from './animations/TiltCard';

const ProjectCard = ({ title, description, technologies, github, live, image }: ProjectData) => {
  const isInternalLink = live?.startsWith('/');

  return (
    <TiltCard glowColor="cyan" className="h-full flex flex-col border border-white/10 hover:border-cyan-400/50 shadow-xl group">
      <div className="relative overflow-hidden h-44 md:h-52 w-full bg-slate-950/80">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base text-slate-300 mb-4 leading-relaxed">
            {description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, index) => (
              <TechnologyBadge key={index} technology={tech} />
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${title} on GitHub`}
              className="flex items-center gap-2 text-sm px-4 py-2.5 min-h-[44px] bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10 hover:border-cyan-400/40 rounded-xl font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
            >
              <Github size={18} />
              <span>Code</span>
            </a>
            {isInternalLink ? (
              <Link
                to={live}
                aria-label={`View live demo for ${title}`}
                className="flex items-center gap-2 text-sm px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] rounded-xl font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
              >
                <ExternalLink size={18} />
                <span>Demo</span>
              </Link>
            ) : (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live site for ${title}`}
                className="flex items-center gap-2 text-sm px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] rounded-xl font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
              >
                <ExternalLink size={18} />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ProjectCard;