import { useState, useContext } from 'react';
import { useIndexTransition } from '../../hooks/use-index-transition';
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
  const { transitions, activeIndex, goTo } = useIndexTransition(projects.length);
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
