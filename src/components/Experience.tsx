import React from 'react';
import { Briefcase } from 'lucide-react';
import { ExperienceData } from '../types/experience';
import ExperienceCard from './ExperienceCard';

const experiences: ExperienceData[] = [
  {
    title: 'Web Development Intern',
    company: 'Tech Innovators',
    period: 'Jun 2023 - Aug 2023',
    description: [
      'Developed and maintained responsive web applications using React.js and Node.js',
      'Implemented RESTful APIs and integrated third-party services',
      'Collaborated with senior developers on large-scale projects',
      'Improved application performance by 40% through code optimization'
    ]
  },
  {
    title: 'Technical Team Lead',
    company: 'College Technical Society',
    period: 'Aug 2022 - Present',
    description: [
      'Lead a team of 10 students in various technical projects',
      'Organized workshops and technical events',
      'Mentored junior members in web development and programming',
      'Managed project timelines and deliverables'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Experience
        </h2>
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;