import React from 'react';
import { Code2, Brain, Coffee } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          About Me
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Software Development
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Passionate about creating efficient and scalable solutions through code.
              Experienced in web development and various programming languages.
            </p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <Brain className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Always eager to learn new technologies and stay updated with the latest
              developments in the tech industry.
            </p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <Coffee className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Problem Solving
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enjoy tackling complex problems and finding innovative solutions through
              analytical thinking and creativity.
            </p>
          </div>
        </div>
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            I'm a second-year B.Tech Computer Science Engineering student with a strong
            passion for technology and innovation. My journey in computer science began
            with curiosity about how software shapes our world, and it has evolved into
            a dedicated pursuit of knowledge and practical skills in various domains of
            computing.
            <br /><br />
            Currently, I'm focusing on web development, machine learning, and cloud
            computing, while maintaining a strong foundation in core computer science
            concepts. I believe in the power of technology to solve real-world problems
            and am always excited to work on projects that make a positive impact.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;