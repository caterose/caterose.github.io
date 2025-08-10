import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import styles from './tv-responsive.module.css';

interface TVResponsiveProps {
  child: React.ReactNode;
  dial?: React.ReactNode;
}

const TVResponsive: React.FC<TVResponsiveProps> = ({ child, dial }: TVResponsiveProps) => {
  // const Dial = {

  // }

  return (
    <div className={styles.tvDiv}>
      <div className={styles.tvScreenOuter}>
        <div className={styles.tvScreenInner}>
          {child}
          {/* <div>hi</div> */}
        </div>
      </div>
      <div className={styles.tvSidePanel}>
        <div className={styles.topDials}>
          <div className={`${styles.dial} ${styles.top}`}>{dial}</div>
          <div className={`${styles.dial} ${styles.bottom}`}></div>
        </div>
        <div className={styles.midButtonsDiv}>
          <div className={styles.midButtonsRow}>
            <LinkedInIcon
              style={{ color: 'var(--neutral-white)', width: '35px', height: '35px' }}
              className={styles.icon}
            />
            <EmailIcon
              style={{ color: 'var(--neutral-white)', width: '35px', height: '35px' }}
              className={styles.icon}
            />
            <CalendarMonthIcon
              style={{ color: 'var(--neutral-white)', width: '35px', height: '35px' }}
              className={styles.icon}
            />
          </div>
          {/* <div className={styles.midButtons}></div>
          <div className={styles.midButtons}></div> */}
        </div>
        <div className={styles.grillsDiv}>
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
          <div className={styles.grill} />
        </div>
      </div>
    </div>
  );
};

export default TVResponsive;
