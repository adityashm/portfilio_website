import { experiencesData } from '../data/portfolioData';
import ExperienceCard from './ExperienceCard';
import SectionReveal from './animations/SectionReveal';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative z-10 bg-transparent text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <SectionReveal direction="up">
          <div className="text-center mb-12">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
              CAREER & JOURNEY
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
              Work Experience
            </h2>
          </div>
        </SectionReveal>

        <div className="relative pl-6 md:pl-10 before:absolute before:left-2 md:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-violet-500 before:to-transparent">
          <StaggerContainer>
            {experiencesData.map((exp, index) => (
              <StaggerItem key={index}>
                <ExperienceCard {...exp} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Experience;