import React from 'react';
import styles from './hero.module.css';

interface HeroProps {
  title: string;
  images: string[];
}

const HeroSection: React.FC<HeroProps> = ({ title, images }: HeroProps) => {
  return (
    <div>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {images.map((src, index) => (
          <img key={index} src={src} />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
