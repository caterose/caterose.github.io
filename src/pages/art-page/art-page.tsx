import React, { useState, useRef, useEffect } from 'react';
import { useTransition } from '@react-spring/web';
import { useIndexTransition } from '../../hooks/use-index-transition';
import PageMapping from '../../components/page-mapping/page-mapping';
import type { PageItem } from '../../components/page-mapping/page-mapping';
import styles from './art-page.module.css';

interface ArtPageProps {
  pages: PageItem[];
}

const ArtPage = ({ pages }: { pages: PageItem[] }) => {
  const { transitions, activeIndex, goTo } = useIndexTransition(pages.length, {
    axis: 'y', // or 'x'
    // tweak spring/offsets if you want
  });

  return (
    <div className={styles.navProjects}>
      <div className={styles.projectContent}>
        <div className={styles.projectNav}>
          {pages.map((page, i) => (
            <div
              key={i}
              className={`${styles.navDot} ${i === activeIndex ? styles.active : ''} ${pages[activeIndex].bg === 'var(--neutral-white)' ? styles.inverseDot : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <PageMapping transitions={transitions} items={pages} />
      </div>
    </div>
  );
};

export default ArtPage;
