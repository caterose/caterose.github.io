import React from 'react';
import { useIsMobile } from '../../hooks/use-is-mobile';
import styles from './mobile-blocker.module.css';

const MobileBlocker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile(768);

  if (isMobile) {
    return (
      <div className={styles.mobileBlocker}>
        <div className={styles.content}>
          <h1 className={styles.title}>Please View on Desktop</h1>
          <p className={styles.message}>
            This site is optimized for desktop viewing. Please switch to full screen mode or use a
            desktop device to view the site.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileBlocker;
