import { useState, useContext } from 'react';
import { useTransition } from '@react-spring/web';
import PageMapping from '../../components/page-mapping/page-mapping';
import ChannelGuide from '../../components/channel-guide/channel-guide';
import { CursorContext } from '../../context/cursor-context';
import type { PageItem } from '../../components/page-mapping/page-mapping';
import styles from './project-page-with-guide.module.css';

interface ProjectPageWithGuideProps {
  projects: PageItem[];
}

const ProjectPageWithGuide: React.FC<ProjectPageWithGuideProps> = ({ projects }) => {
  const [, setCursor] = useContext(CursorContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const transitions = useTransition(activeIndex, {
    key: activeIndex,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 200, friction: 30 },
  });

  const goTo = (index: number) => {
    setActiveIndex(index);
  };
  const [showGuide, setShowGuide] = useState(true);

  const handleSelectProject = (index: number) => {
    goTo(index);
    setShowGuide(false);
  };

  const handleToggleGuide = () => {
    setShowGuide(!showGuide);
  };

  return (
    <div className={styles.container}>
      {/* Channel Guide Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={handleToggleGuide}
        onMouseEnter={() => setCursor({ active: true })}
        onMouseLeave={() => setCursor({ active: false })}
      >
        {showGuide ? 'HIDE GUIDE' : 'SHOW GUIDE'}
      </button>

      {/* Channel Guide Sidebar */}
      {showGuide && (
        <div className={styles.guideSidebar}>
          <ChannelGuide
            projects={projects}
            onSelectProject={handleSelectProject}
            activeIndex={activeIndex}
          />
        </div>
      )}

      {/* Main Project View */}
      <div className={`${styles.projectView} ${showGuide ? styles.withGuide : ''}`}>
        <div className={styles.projectContent}>
          <PageMapping transitions={transitions} items={projects} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPageWithGuide;
