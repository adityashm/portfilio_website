import React from 'react';
import { Code2, Database, Cloud, Layout, Terminal, GitBranch } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code2 className="text-blue-600 dark:text-blue-400" />,
      skills: ['Python', 'JavaScript', 'TypeScript', 'C']
    },
    {
      title: 'Web Development',
      icon: <Layout className="text-blue-600 dark:text-blue-400" />,
      skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS']
    },
    {
      title: 'Backend & Databases',
      icon: <Database className="text-blue-600 dark:text-blue-400" />,
      skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL']
    },
    {
      title: 'Cloud & DevOps',
      icon: <Cloud className="text-blue-600 dark:text-blue-400" />,
      skills: ['AWS', 'Docker',  'Linux']
    },
    {
      title: 'Tools & Technologies',
      icon: <Terminal className="text-blue-600 dark:text-blue-400" />,
      skills: ['Git', 'VS Code', 'Postman', 'Figma']
    },
    {
      title: 'Version Control',
      icon: <GitBranch className="text-blue-600 dark:text-blue-400" />,
      skills: ['Git', 'GitHub', 'GitLab']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
