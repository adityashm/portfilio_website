import React from 'react';
import { Briefcase } from 'lucide-react';
import { ExperienceData } from '../types/experience';

const ExperienceCard = ({ title, company, period, description }: ExperienceData) => {
  return (
    <div className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Briefcase className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-medium">
            {company}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            {period}
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;