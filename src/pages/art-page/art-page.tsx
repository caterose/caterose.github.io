import React, { useState, useEffect } from 'react';
import { useTransition } from '@react-spring/web';
import PageMapping from '../../components/page-mapping/page-mapping';
import type { PageItem } from '../../components/page-mapping/page-mapping';
import styles from './art-page.module.css';

interface ArtPageProps {
  pages: PageItem[];
}

const ArtPage = ({ pages }: { pages: PageItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const transitions = useTransition(activeIndex, {
    key: activeIndex,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 200, friction: 30 }, // Smooth fade transition
  });

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  // Add keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setActiveIndex((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pages.length]);

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
