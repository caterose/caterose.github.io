import React from 'react';
import styles from './hero.module.css';

interface HeroProps {
  bkgdImages: string[];
}

const Hero: React.FC<HeroProps> = ({ bkgdImages }: HeroProps) => {
  const INTERVAL = 1.2; // seconds each image is fully shown
  const TOTAL = bkgdImages.length * INTERVAL; // one full cycle length
  const many = bkgdImages.length > 1;
  return (
    <div className={styles.frame}>
      {bkgdImages.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          className={`${styles.layer} ${many ? styles.flash : ''}`}
          style={
            many
              ? { animationDuration: `${TOTAL}s`, animationDelay: `${i * INTERVAL}s` }
              : undefined
          }
          alt=""
        />
      ))}

      <img src="/ctvBkgd.svg" className={styles.overlay} alt="" />
    </div>
  );
};

export default Hero;
