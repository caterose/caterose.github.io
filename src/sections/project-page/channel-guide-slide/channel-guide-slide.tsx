import { useState, useMemo, useEffect, useRef, useContext } from 'react';
import { useProjectContext } from '../../../contexts/project-context';
import { CursorContext } from '../../../context/cursor-context';
import type { PageItem } from '../../../components/page-mapping/page-mapping';
import styles from './channel-guide-slide.module.css';

interface ChannelGuideSlideProps {
  // Props can be empty since we use context
}

interface CategorizedProject extends PageItem {
  skills: string[];
  date?: string;
  originalIndex: number;
}

const ChannelGuideSlide: React.FC<ChannelGuideSlideProps> = () => {
  const { projects, activeIndex } = useProjectContext();
  const [, setCursor] = useContext(CursorContext);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [skillsExpanded, setSkillsExpanded] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const timelineRef = useRef<HTMLDivElement>(null);

  // Extract all unique skills from projects
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    projects.forEach((project) => {
      // Get skills from nodes array
      if (project.props?.nodes && Array.isArray(project.props.nodes)) {
        project.props.nodes.forEach((node: string) => {
          if (node && node.trim()) {
            skillSet.add(node.trim());
          }
        });
      }
      // Also check for skills prop if it exists
      if (project.props?.skills && Array.isArray(project.props.skills)) {
        project.props.skills.forEach((skill: string) => {
          if (skill && skill.trim()) {
            skillSet.add(skill.trim());
          }
        });
      }
    });
    return Array.from(skillSet).sort();
  }, [projects]);

  const categorizeProjects = (): CategorizedProject[] => {
    const nonHeroProjects = projects.filter((p) => p.key !== 'hero' && p.key !== 'channel-guide');
    return nonHeroProjects.map((project) => {
      const skills: string[] = [];
      if (project.props?.nodes && Array.isArray(project.props.nodes)) {
        skills.push(...project.props.nodes.filter((n: string) => n && n.trim()));
      }
      if (project.props?.skills && Array.isArray(project.props.skills)) {
        skills.push(...project.props.skills.filter((s: string) => s && s.trim()));
      }

      return {
        ...project,
        skills: skills.map((s) => s.trim()),
        originalIndex: projects.findIndex((p) => p.key === project.key),
        date: project.props?.date || undefined,
      };
    });
  };

  const categorizedProjects = categorizeProjects();

  const getFilteredProjects = (): CategorizedProject[] => {
    if (selectedSkills.size === 0) {
      return categorizedProjects;
    }
    return categorizedProjects.filter((project) => {
      return project.skills.some((skill) => selectedSkills.has(skill));
    });
  };

  const filteredProjects = getFilteredProjects();

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) {
        next.delete(skill);
      } else {
        next.add(skill);
      }
      return next;
    });
  };

  const handleProjectClick = (project: CategorizedProject) => {
    const projectKey = project.key ? String(project.key) : null;
    if (!projectKey) return;

    if (expandedProject === projectKey) {
      setExpandedProject(null);
      setSkillsExpanded(true); // Expand skills when project is collapsed
    } else {
      setExpandedProject(projectKey);
      setSkillsExpanded(false); // Collapse skills when project is expanded
      if (!currentImageIndex[projectKey]) {
        setCurrentImageIndex((prev) => ({ ...prev, [projectKey]: 0 }));
      }
    }
  };

  const getCurrentImageIndex = (projectKey: string) => {
    return currentImageIndex[projectKey] || 0;
  };

  const setImageIndex = (projectKey: string, index: number) => {
    setCurrentImageIndex((prev) => ({ ...prev, [projectKey]: index }));
  };

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.date && b.date) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return a.originalIndex - b.originalIndex;
  });

  // Update timeline line width when content changes
  useEffect(() => {
    if (!timelineRef.current) return;

    const updateLineWidth = () => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      const scrollWidth = timeline.scrollWidth;
      timeline.style.setProperty('--timeline-width', `${scrollWidth - 20}px`);
    };

    // Update on mount and when projects change
    updateLineWidth();

    // Use ResizeObserver to update when content size changes
    const resizeObserver = new ResizeObserver(updateLineWidth);
    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }

    // Also update on scroll in case content changes
    const handleScroll = () => updateLineWidth();
    timelineRef.current.addEventListener('scroll', handleScroll);

    return () => {
      resizeObserver.disconnect();
      if (timelineRef.current) {
        timelineRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [sortedProjects, expandedProject]);

  // Keyboard navigation for image modal
  useEffect(() => {
    if (!selectedImage || !expandedProject) return;

    const currentProject = sortedProjects.find(
      (p) => (p.key ? String(p.key) : null) === expandedProject,
    );
    const images = currentProject?.props?.images || [];
    if (images.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const currentIdx = getCurrentImageIndex(expandedProject);

        if (e.key === 'ArrowLeft') {
          const prevIdx = currentIdx > 0 ? currentIdx - 1 : images.length - 1;
          setImageIndex(expandedProject, prevIdx);
          setSelectedImage(images[prevIdx]);
        } else if (e.key === 'ArrowRight') {
          const nextIdx = currentIdx < images.length - 1 ? currentIdx + 1 : 0;
          setImageIndex(expandedProject, nextIdx);
          setSelectedImage(images[nextIdx]);
        }
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, expandedProject, filteredProjects, getCurrentImageIndex]);

  return (
    <div className={styles.channelGuideSlide}>
      <div className={styles.header}>
        <div
          className={styles.skillsHeader}
          onClick={() => setSkillsExpanded(!skillsExpanded)}
          onMouseEnter={() => setCursor({ active: true })}
          onMouseLeave={() => setCursor({ active: false })}
        >
          <h2 className={styles.guideTitle}>
            SKILLS FILTER
            {selectedSkills.size === 0 ? (
              <span className={styles.projectCount}> ({filteredProjects.length} PROJECTS)</span>
            ) : (
              <span className={styles.projectCount}>
                {' '}
                ({filteredProjects.length} PROJECT{filteredProjects.length !== 1 ? 'S' : ''})
              </span>
            )}
          </h2>
          <span className={styles.expandIcon}>{skillsExpanded ? '−' : '+'}</span>
        </div>
        {skillsExpanded && (
          <div className={styles.skillsContainer}>
            <div className={styles.skillsRow}>
              {allSkills.map((skill) => (
                <div
                  key={skill}
                  className={`${styles.skillFilter} ${selectedSkills.has(skill) ? styles.active : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSkill(skill);
                  }}
                  onMouseEnter={() => setCursor({ active: true })}
                  onMouseLeave={() => setCursor({ active: false })}
                >
                  <span className={styles.skillText}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.timelineContainer}>
        <div className={styles.timeline} ref={timelineRef}>
          {sortedProjects.map((project, idx) => {
            const projectKey = project.key ? String(project.key) : `project-${idx}`;
            const actualIndex = projects.findIndex((p) => p.key === project.key);
            const isActive = actualIndex === activeIndex;

            const isExpanded = expandedProject === projectKey;

            return (
              <div
                key={project.key || idx}
                className={`${styles.timelineItem} ${isActive ? styles.active : ''} ${isExpanded ? styles.expanded : ''}`}
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
                    {isExpanded && project.props && (
                      <div className={styles.expandedContent}>
                        {project.props.description && (
                          <p className={styles.projectDescription}>{project.props.description}</p>
                        )}
                        {project.props.images && project.props.images.length > 0 && (
                          <div className={styles.projectImagesContainer}>
                            <div
                              className={styles.projectImages}
                              onScroll={(e) => {
                                const container = e.currentTarget;
                                const scrollLeft = container.scrollLeft;
                                const imageWidth = 120 + 12; // image width + gap
                                const newIndex = Math.round(scrollLeft / imageWidth);
                                const currentIdx = getCurrentImageIndex(projectKey);
                                if (
                                  newIndex !== currentIdx &&
                                  newIndex >= 0 &&
                                  project.props &&
                                  newIndex < project.props.images.length
                                ) {
                                  setImageIndex(projectKey, newIndex);
                                }
                              }}
                            >
                              {project.props.images.map((image: string, imgIdx: number) => (
                                <img
                                  key={imgIdx}
                                  src={image}
                                  alt={`${project.props?.title} screenshot ${imgIdx + 1}`}
                                  className={styles.projectImage}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImageIndex(projectKey, imgIdx);
                                    setSelectedImage(image);
                                  }}
                                  onMouseEnter={() => setCursor({ active: true })}
                                  onMouseLeave={() => setCursor({ active: false })}
                                />
                              ))}
                            </div>
                            {project.props.images.length > 1 && (
                              <div className={styles.imageDots}>
                                {project.props.images.map((_: string, dotIdx: number) => {
                                  const currentIdx = getCurrentImageIndex(projectKey);
                                  return (
                                    <div
                                      key={dotIdx}
                                      className={`${styles.imageDot} ${dotIdx === currentIdx ? styles.active : ''}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const container = e.currentTarget.parentElement
                                          ?.previousElementSibling as HTMLElement;
                                        if (container) {
                                          const imageWidth = 120 + 12; // image width + gap
                                          container.scrollTo({
                                            left: dotIdx * imageWidth,
                                            behavior: 'smooth',
                                          });
                                          setImageIndex(projectKey, dotIdx);
                                        }
                                      }}
                                      onMouseEnter={() => setCursor({ active: true })}
                                      onMouseLeave={() => setCursor({ active: false })}
                                    />
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                        {project.props.nodes && project.props.nodes.length > 0 && (
                          <div className={styles.projectNodes}>
                            {project.props.nodes.map((node: string, nodeIdx: number) => (
                              <span key={nodeIdx} className={styles.projectNode}>
                                {node}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedImage &&
        expandedProject &&
        (() => {
          const currentProject = sortedProjects.find(
            (p) => (p.key ? String(p.key) : null) === expandedProject,
          );
          const images = currentProject?.props?.images || [];
          const currentIdx = getCurrentImageIndex(expandedProject);

          return (
            <div
              className={styles.imageModal}
              onClick={() => {
                setSelectedImage(null);
              }}
            >
              <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
                <button
                  className={styles.imageModalClose}
                  onClick={() => {
                    setSelectedImage(null);
                  }}
                  onMouseEnter={() => setCursor({ active: true })}
                  onMouseLeave={() => setCursor({ active: false })}
                >
                  ×
                </button>
                <img
                  src={selectedImage}
                  alt="Full size project image"
                  className={styles.imageModalImage}
                />
                {images.length > 1 && (
                  <div className={styles.imageModalDots}>
                    {images.map((_: string, dotIdx: number) => (
                      <div
                        key={dotIdx}
                        className={`${styles.imageModalDot} ${dotIdx === currentIdx ? styles.active : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageIndex(expandedProject, dotIdx);
                          setSelectedImage(images[dotIdx]);
                        }}
                        onMouseEnter={() => setCursor({ active: true })}
                        onMouseLeave={() => setCursor({ active: false })}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default ChannelGuideSlide;
