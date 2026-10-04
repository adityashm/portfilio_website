import { projectsData } from '../data/portfolioData';
import OrbitProjects from './OrbitProjects';

const Projects = () => {
  return (
    <section id="projects" className="relative z-10 bg-transparent text-white">
      <OrbitProjects
        projects={projectsData}
        leftTitle="FEATURED"
        rightTitle="PROJECTS"
        centerText="Production platforms, autonomous telemetry, and cloud systems engineered with high performance."
        scrollLengthVh={220}
      />
    </section>
  );
};

export default Projects;