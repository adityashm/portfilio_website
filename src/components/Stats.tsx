import React, { useState, useEffect } from 'react';
import { Github, Code2, Award } from 'lucide-react';

const Stats = () => {
  const [stats, setStats] = useState({
    repositories: 12,
    followers: 5,
    contributions: 150,
    experience: 2
  });

  useEffect(() => {
    // Fetch GitHub stats
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/adityashm', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(prev => ({
            ...prev,
            repositories: data.public_repos || 12,
            followers: data.followers || 5
          }));
        }
      } catch (error) {
        console.log('Using default stats');
      }
    };

    fetchGitHubStats();
  }, []);

  const statCards = [
    {
      icon: Code2,
      label: 'Projects',
      value: stats.repositories,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Github,
      label: 'GitHub Followers',
      value: stats.followers,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Award,
      label: 'Years Experience',
      value: stats.experience,
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Code2,
      label: 'Contributions',
      value: stats.contributions,
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="transform transition-all hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${stat.color} p-1 rounded-2xl`}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center">
                    <Icon className="mx-auto mb-4 text-gray-400 dark:text-gray-600" size={32} />
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}+
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;