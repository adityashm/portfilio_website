import React from 'react';

interface TechnologyBadgeProps {
  technology: string;
}

const TechnologyBadge = ({ technology }: TechnologyBadgeProps) => {
  return (
    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm">
      {technology}
    </span>
  );
};

export default TechnologyBadge;