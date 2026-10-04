import { projectsData } from '../data/portfolioData';
import SectionReveal from './animations/SectionReveal';
import ExpandingProjectCards from './ExpandingProjectCards';

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative z-10 bg-transparent text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <SectionReveal direction="up">
          <div className="text-center mb-12 md:mb-14">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2 font-mono">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight mb-4">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
              Interactive expanding showcase of full-stack platforms, autonomous telemetry, and production enterprise software.
            </p>
          </div>
        </SectionReveal>

        {/* Expanding Cards Interactive Showcase */}
        <SectionReveal delay={0.15} direction="up">
          <ExpandingProjectCards projects={projectsData} />
        </SectionReveal>
      </div>
    </section>
  );
};

export default Projects;