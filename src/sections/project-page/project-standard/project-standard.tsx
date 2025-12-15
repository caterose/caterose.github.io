import React, { useState, useEffect, useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { CursorContext } from '../../../context/cursor-context';
import styles from './project-standard.module.css';

interface ProjectStandardProps {
  title: string;
  job: string;
  description: string;
  images?: string[];
  nodes: string[];
  link?: string;
  otherLinks?: Array<{ label: string; url: string }>;
}

export const ProjectStandard: React.FC<ProjectStandardProps> = ({
  title,
  job,
  description,
  images,
  nodes,
  link,
  otherLinks,
}: ProjectStandardProps) => {
  const [, setCursor] = useContext(CursorContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (image: string, index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(image);
    document.body.classList.add('image-modal-open');
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.classList.remove('image-modal-open');
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!images || images.length === 0) return;
    if (direction === 'prev') {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(images[newIndex]);
    } else {
      const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  };

  // Keyboard navigation for image modal
  useEffect(() => {
    if (!selectedImage || !images || images.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
        setCurrentImageIndex(newIndex);
        setSelectedImage(images[newIndex]);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
        setCurrentImageIndex(newIndex);
        setSelectedImage(images[newIndex]);
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex, images]);

  // Cleanup: remove body class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('image-modal-open');
    };
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.right}>
        <div className={styles.titleContainer}>
          <h1 className={`project-title-1 ${styles.projectTitle}`}>{title}</h1>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.titleLink}
              onMouseEnter={() => setCursor({ active: true })}
              onMouseLeave={() => setCursor({ active: false })}
            >
              <OpenInNewIcon className={styles.linkIcon} />
            </a>
          )}
        </div>
        <h2 className={`project-subtitle-2 ${styles.jobTitle}`}>{job}</h2>
        {/* <h2 className={`project-subtitle-1 ${styles.fastFacts}`}>FAST FACTS:</h2> */}
        <div className={styles.factNodes}>
          {nodes.map((node, index) => (
            <span key={index} className={styles.projectNode}>
              {node}
            </span>
          ))}
        </div>
        <p className={`project-body-1 ${styles.description}`}>{description}</p>
        {otherLinks && otherLinks.length > 0 && (
          <div className={styles.otherLinks}>
            {otherLinks.map((linkItem, index) => (
              <a
                key={index}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.otherLink}
                onMouseEnter={() => setCursor({ active: true })}
                onMouseLeave={() => setCursor({ active: false })}
              >
                {linkItem.label}
                <OpenInNewIcon className={styles.linkIcon} />
              </a>
            ))}
          </div>
        )}
      </div>
      {images && images.length > 0 && (
        <div className={styles.left}>
          <div className={styles.projectImagesContainer}>
            <div
              className={styles.projectImages}
              onScroll={(e) => {
                const container = e.currentTarget;
                const scrollLeft = container.scrollLeft;
                const imageWidth = 250 + 12; // image width + gap
                const newIndex = Math.round(scrollLeft / imageWidth);
                if (newIndex !== currentImageIndex && newIndex >= 0 && newIndex < images.length) {
                  setCurrentImageIndex(newIndex);
                }
              }}
            >
              {images.map((image, imgIdx) => (
                <img
                  key={imgIdx}
                  src={image}
                  alt={`${title} screenshot ${imgIdx + 1}`}
                  className={styles.projectImage}
                  onClick={() => handleImageClick(image, imgIdx)}
                  onMouseEnter={() => setCursor({ active: true })}
                  onMouseLeave={() => setCursor({ active: false })}
                  onError={() => {
                    console.error('Image failed to load:', image);
                  }}
                  onLoad={() => console.log('Image loaded successfully:', image)}
                />
              ))}
            </div>
            {images.length > 1 && (
              <div className={styles.imageDots}>
                {images.map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    className={`${styles.imageDot} ${dotIdx === currentImageIndex ? styles.active : ''}`}
                    onClick={() => {
                      const container = document.querySelector(
                        `.${styles.projectImages}`,
                      ) as HTMLElement;
                      if (container) {
                        const imageWidth = 250 + 12;
                        container.scrollTo({
                          left: dotIdx * imageWidth,
                          behavior: 'smooth',
                        });
                        setCurrentImageIndex(dotIdx);
                      }
                    }}
                    onMouseEnter={() => setCursor({ active: true })}
                    onMouseLeave={() => setCursor({ active: false })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className={styles.imageModal} onClick={closeModal}>
          <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.imageModalClose}
              onClick={closeModal}
              onMouseEnter={() => setCursor({ active: true })}
              onMouseLeave={() => setCursor({ active: false })}
            >
              <CloseIcon />
            </button>
            {images && images.length > 1 && (
              <>
                <button
                  className={`${styles.imageModalNav} ${styles.imageModalPrev}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  onMouseEnter={() => setCursor({ active: true })}
                  onMouseLeave={() => setCursor({ active: false })}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  className={`${styles.imageModalNav} ${styles.imageModalNext}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  onMouseEnter={() => setCursor({ active: true })}
                  onMouseLeave={() => setCursor({ active: false })}
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}
            <img
              src={selectedImage}
              alt="Full size project image"
              className={styles.imageModalImage}
            />
            {images && images.length > 1 && (
              <div className={styles.imageModalDots}>
                {images.map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    className={`${styles.imageModalDot} ${dotIdx === currentImageIndex ? styles.active : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(dotIdx);
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
      )}
    </div>
  );
};
