import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectData } from '../types/project';
import TechnologyBadge from './TechnologyBadge';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ProjectCard = ({ title, description, technologies, github, live, image }: ProjectData) => {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:scale-105 h-full flex flex-col opacity-0"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 md:h-48 object-cover"
      />
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <TechnologyBadge key={index} technology={tech} />
          ))}
        </div>
        <div className="flex gap-3 md:gap-4 flex-wrap">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm md:text-base px-3 py-2 md:px-4 bg-gray-100 dark:bg-gray-800 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded transition-colors"
          >
            <Github size={18} />
            <span>Code</span>
          </a>
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm md:text-base px-3 py-2 md:px-4 bg-blue-100 dark:bg-blue-900 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 rounded transition-colors"
          >
            <ExternalLink size={18} />
            <span>Live</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;