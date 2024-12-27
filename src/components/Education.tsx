import React from 'react';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Education
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <GraduationCap className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Bachelor of Technology - BTech, Computer Science
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  IMS ENGINEERING COLLEGE, GHAZIABAD
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  2023 - 2027
                </p>
                <ul className="mt-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>CGPA: 8.6/10</li>
                  <li>Member of Technical Society</li>
                  <li>Active participant in coding competitions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;