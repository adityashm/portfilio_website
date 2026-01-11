import { useEffect, useState } from 'react';
import { Github, Star, GitFork } from 'lucide-react';

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface Repository {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  url: string;
}

const GitHubStats = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userRes = await fetch('https://api.github.com/users/adityashm');
        const userData = await userRes.json();
        if (userData.message) {
          console.error('GitHub API error:', userData.message);
          setLoading(false);
          return;
        }
        setUser(userData);

        // Fetch top repositories
        const reposRes = await fetch(
          'https://api.github.com/users/adityashm/repos?sort=stars&per_page=3'
        );
        const reposData = await reposRes.json();
        
        // Ensure reposData is an array
        if (Array.isArray(reposData)) {
          setRepos(reposData);
        } else {
          console.error('Expected array from repos API, got:', typeof reposData);
          setRepos([]);
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading GitHub stats...</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <Github className="w-8 h-8 text-gray-900 dark:text-white" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">GitHub Stats</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Public Repos</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{user.public_repos}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Followers</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{user.followers}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Following</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{user.following}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Member Since</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {new Date(user.created_at).getFullYear()}
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Top Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {repo.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Language: {repo.language || 'N/A'}
              </p>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Star size={16} />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork size={16} />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://github.com/adityashm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Github size={20} />
            View Full Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
