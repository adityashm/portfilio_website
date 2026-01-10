import React from 'react';
import { Briefcase } from 'lucide-react';
import { ExperienceData } from '../types/experience';

const ExperienceCard = ({ title, company, period, description }: ExperienceData) => {
  return (
    <div className="mb-6 md:mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-md">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
          <Briefcase className="text-blue-600 dark:text-blue-400 w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white break-words">
            {title}
          </h3>
          <p className="text-sm md:text-base text-blue-600 dark:text-blue-400 font-medium">
            {company}
          </p>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 md:mb-4">
            {period}
          </p>
          <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 dark:text-gray-400 space-y-1 md:space-y-2">
            {description.map((item, index) => (
              <li key={index} className="break-words">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;