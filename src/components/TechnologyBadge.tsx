interface TechnologyBadgeProps {
  technology: string;
}

const TechnologyBadge = ({ technology }: TechnologyBadgeProps) => {
  return (
    <span className="badge-tech">
      {technology}
    </span>
  );
};

export default TechnologyBadge;