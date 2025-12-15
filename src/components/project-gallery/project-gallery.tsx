import React, { useState, useEffect, useContext } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { CursorContext } from '../../context/cursor-context';
import styles from './project-gallery.module.css';

interface ProjectGalleryProps {
  images: string[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  const [, setCursor] = useContext(CursorContext);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Calculate grid columns based on number of images
  const getGridColumns = () => {
    if (!images || images.length === 0) return 2;
    if (images.length <= 2) return 2;
    if (images.length <= 4) return 2;
    if (images.length <= 6) return 3;
    return 4;
  };

  const gridColumns = getGridColumns();

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = ''; // Restore scrolling
    setTimeout(() => setSelectedIndex(null), 300); // Delay to allow fade out
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft' && selectedIndex !== null) {
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
        setSelectedIndex(prevIndex);
      } else if (e.key === 'ArrowRight' && selectedIndex !== null) {
        const nextIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
        setSelectedIndex(nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, images.length]);

  const lightboxSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 30 },
  });

  const imageSpring = useSpring({
    transform: isOpen ? 'scale(1)' : 'scale(0.9)',
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 30 },
  });

  return (
    <>
      <div
        className={styles.galleryGrid}
        style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.galleryItem}
            onClick={() => openLightbox(index)}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setCursor({ active: true })}
            onMouseLeave={() => setCursor({ active: false })}
          >
            <img
              src={image}
              alt={`Project screenshot ${index + 1}`}
              className={styles.thumbnail}
              loading="lazy"
            />
            <div className={styles.overlay}>
              <span className={styles.expandIcon}>↗</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <animated.div className={styles.lightbox} style={lightboxSpring} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={closeLightbox}
              onMouseEnter={() => setCursor({ active: true })}
              onMouseLeave={() => setCursor({ active: false })}
            >
              ×
            </button>

            {images.length > 1 && (
              <>
                <button
                  className={`${styles.navButton} ${styles.prevButton}`}
                  onClick={() => {
                    const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
                    setSelectedIndex(prevIndex);
                  }}
                  onMouseEnter={() => setCursor({ active: true })}
                  onMouseLeave={() => setCursor({ active: false })}
                >
                  ‹
                </button>
                <button
                  className={`${styles.navButton} ${styles.nextButton}`}
                  onClick={() => {
                    const nextIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
                    setSelectedIndex(nextIndex);
                  }}
                  onMouseEnter={() => setCursor({ active: true })}
                  onMouseLeave={() => setCursor({ active: false })}
                >
                  ›
                </button>
              </>
            )}

            <animated.img
              src={images[selectedIndex]}
              alt={`Project screenshot ${selectedIndex + 1}`}
              className={styles.lightboxImage}
              style={imageSpring}
            />

            {images.length > 1 && (
              <div className={styles.imageCounter}>
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </animated.div>
      )}
    </>
  );
};

export default ProjectGallery;
