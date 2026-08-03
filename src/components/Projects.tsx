import { useState, useMemo, KeyboardEvent } from 'react';
import { projectsData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import SectionReveal from './animations/SectionReveal';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';

const Projects = () => {
  const [selectedTech, setSelectedTech] = useState<string>('all');

  // Extract all unique technologies
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projectsData.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, []);

  const categories = useMemo(() => ['all', ...allTechnologies], [allTechnologies]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;

    e.preventDefault();
    const currentIndex = categories.indexOf(selectedTech);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % categories.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = categories.length - 1;
    }

    const nextTech = categories[nextIndex];
    setSelectedTech(nextTech);

    const tabButtons = e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    if (tabButtons[nextIndex]) {
      tabButtons[nextIndex].focus();
    }
  };

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (selectedTech === 'all') return projectsData;
    return projectsData.filter(project => 
      project.technologies.includes(selectedTech)
    );
  }, [selectedTech]);

  return (
    <section id="projects" className="py-24 relative z-10 bg-transparent text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <SectionReveal direction="up">
          <div className="text-center mb-12">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
              Featured Projects
            </h2>
          </div>
        </SectionReveal>
        
        {/* Technology Filter Bar */}
        <SectionReveal delay={0.1} direction="up">
          <div
            role="tablist"
            aria-label="Filter projects by technology"
            onKeyDown={handleKeyDown}
            className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto p-2 rounded-2xl glass-card-cosmic border border-white/10"
          >
            <button
              role="tab"
              aria-selected={selectedTech === 'all'}
              aria-label="Filter all projects"
              tabIndex={selectedTech === 'all' ? 0 : -1}
              onClick={() => setSelectedTech('all')}
              className={`px-4 py-2 min-h-[40px] rounded-full font-medium transition-all duration-200 text-xs md:text-sm focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none ${
                selectedTech === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-cyan-300/40'
                  : 'bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5'
              }`}
            >
              All Projects
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                role="tab"
                aria-selected={selectedTech === tech}
                aria-label={`Filter projects by ${tech}`}
                tabIndex={selectedTech === tech ? 0 : -1}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 min-h-[40px] rounded-full font-medium transition-all duration-200 text-xs md:text-sm focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none ${
                  selectedTech === tech
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-cyan-300/40'
                    : 'bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <StaggerItem key={index} className="h-full">
                <ProjectCard {...project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-12 glass-card-cosmic rounded-2xl max-w-lg mx-auto border border-white/10">
            <p className="text-slate-300 text-lg">
              No projects found with <span className="text-cyan-400 font-semibold">{selectedTech}</span> technology
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;