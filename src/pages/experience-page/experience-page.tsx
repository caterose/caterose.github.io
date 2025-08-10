import React from 'react';

interface ExperienceProps {
  test: 'Experinece Page';
}

const ExperiencePage: React.FC<ExperienceProps> = ({ test }: ExperienceProps) => {
  return <div>{test}</div>;
};

export default ExperiencePage;
