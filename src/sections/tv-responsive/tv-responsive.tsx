import React from 'react';
import styles from './tv-responsive.module.css';

interface TVResponsiveProps {
  child: React.ReactNode;
}

const TVResponsive: React.FC<TVResponsiveProps> = ({ child }: TVResponsiveProps) => {
  return (
    <div className={styles.tvDiv}>
      <div className={styles.tvScreenOuter}>
        <div className={styles.tvScreenInner}>{child}</div>
      </div>
    </div>
  );
};

export default TVResponsive;
