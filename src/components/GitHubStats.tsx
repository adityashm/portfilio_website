import { Github, Code2, Users } from 'lucide-react';

const GitHubStats = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <Github className="w-8 h-8 text-gray-900 dark:text-white" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">GitHub Profile</h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GitHub Profile Card */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-900 dark:bg-white rounded-lg">
                <Github className="w-6 h-6 text-white dark:text-gray-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  @adityashm
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Full Stack Developer
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Open source projects and contributions in Python, React, FastAPI, and Web Development.
            </p>
            <a
              href="https://github.com/adityashm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              <Github size={20} />
              Visit Profile
            </a>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Projects & Contributions
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Projects</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Data Analysis Dashboard, REST API, Web Scraper & More
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Technologies</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Python, React, FastAPI, TypeScript
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
