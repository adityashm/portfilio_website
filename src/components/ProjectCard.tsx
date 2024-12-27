import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectData } from '../types/project';
import TechnologyBadge from './TechnologyBadge';

const ProjectCard = ({ title, description, technologies, github, live, image }: ProjectData) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <TechnologyBadge key={index} technology={tech} />
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Github size={20} />
            Code
          </a>
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ExternalLink size={20} />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;