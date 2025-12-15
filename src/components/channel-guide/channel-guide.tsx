import React, { useState, useContext } from 'react';
import { CursorContext } from '../../context/cursor-context';
import type { PageItem } from '../page-mapping/page-mapping';
import styles from './channel-guide.module.css';

interface ChannelGuideProps {
  projects: PageItem[];
  onSelectProject: (index: number) => void;
  activeIndex: number;
}

type ProjectCategory = 'CS' | 'History' | 'Design' | 'All';

interface CategorizedProject extends PageItem {
  category: ProjectCategory;
  date?: string; // Optional date for timeline
  originalIndex: number;
}

const ChannelGuide: React.FC<ChannelGuideProps> = ({ projects, onSelectProject, activeIndex }) => {
  const [, setCursor] = useContext(CursorContext);
  const [selectedChannel, setSelectedChannel] = useState<ProjectCategory>('All');
  const [, setSelectedProject] = useState<number | null>(null);

  // Categorize projects (you can add category to your project items later)
  const categorizeProjects = (): CategorizedProject[] => {
    const nonHeroProjects = projects.filter((p) => p.key !== 'hero');
    return nonHeroProjects.map((project) => {
      // Auto-categorize based on title/content
      let category: ProjectCategory = 'CS';
      const title = project.props?.title?.toLowerCase() || '';
      if (title.includes('history') || title.includes('research')) {
        category = 'History';
      } else if (title.includes('design') || title.includes('art')) {
        category = 'Design';
      }

      return {
        ...project,
        category,
        originalIndex: projects.findIndex((p) => p.key === project.key),
        date: project.props?.date || undefined,
      };
    });
  };

  const categorizedProjects = categorizeProjects();

  const channels: ProjectCategory[] = ['All', 'CS', 'History', 'Design'];

  const getChannelProjects = (channel: ProjectCategory): CategorizedProject[] => {
    if (channel === 'All') return categorizedProjects;
    return categorizedProjects.filter((p) => p.category === channel);
  };

  const channelProjects = getChannelProjects(selectedChannel);

  // Sort by date if available, otherwise by original index
  const sortedProjects = [...channelProjects].sort((a, b) => {
    if (a.date && b.date) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return a.originalIndex - b.originalIndex;
  });

  const handleProjectClick = (project: CategorizedProject) => {
    const actualIndex = projects.findIndex((p) => p.key === project.key);
    if (actualIndex !== -1) {
      onSelectProject(actualIndex);
      setSelectedProject(actualIndex);
    }
  };

  return (
    <div className={styles.channelGuide}>
      {/* Channel Selector */}
      <div className={styles.channelSelector}>
        <h2 className={styles.guideTitle}>CHANNEL GUIDE</h2>
        <div className={styles.channels}>
          {channels.map((channel) => (
            <button
              key={channel}
              className={`${styles.channelButton} ${selectedChannel === channel ? styles.active : ''}`}
              onClick={() => setSelectedChannel(channel)}
              onMouseEnter={() => setCursor({ active: true })}
              onMouseLeave={() => setCursor({ active: false })}
            >
              <span className={styles.channelNumber}>
                {channel === 'All'
                  ? 'ALL'
                  : channel === 'CS'
                    ? 'CH 1'
                    : channel === 'History'
                      ? 'CH 2'
                      : 'CH 3'}
              </span>
              <span className={styles.channelName}>{channel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline View */}
      <div className={styles.timelineContainer}>
        <h3 className={styles.timelineTitle}>
          {selectedChannel === 'All' ? 'ALL PROJECTS' : `${selectedChannel} PROJECTS`} - TIMELINE
        </h3>
        <div className={styles.timeline}>
          {sortedProjects.map((project, idx) => {
            const actualIndex = projects.findIndex((p) => p.key === project.key);
            const isActive = actualIndex === activeIndex;

            return (
              <div
                key={project.key || idx}
                className={`${styles.timelineItem} ${isActive ? styles.active : ''}`}
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => setCursor({ active: true })}
                onMouseLeave={() => setCursor({ active: false })}
              >
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.projectCard}>
                    <h4 className={styles.projectTitle}>{project.props?.title || 'Untitled'}</h4>
                    {project.props?.job && <p className={styles.projectJob}>{project.props.job}</p>}
                    {project.date && <span className={styles.projectDate}>{project.date}</span>}
                    {project.props?.description && (
                      <p className={styles.projectDescription}>
                        {project.props.description.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChannelGuide;
