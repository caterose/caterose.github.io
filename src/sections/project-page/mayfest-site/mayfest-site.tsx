import React, { useState, useEffect, useContext } from 'react';
import { CursorContext } from '../../../context/cursor-context';
import styles from './mayfest-site.module.css';

interface MayfestSiteProps {
  title: string;
  job: string;
  description: string;
  images: string[];
  nodes: string[];
}

export const MayfestSite: React.FC<MayfestSiteProps> = ({
  title,
  job,
  description,
  images,
  nodes,
}: MayfestSiteProps) => {
  const [, setCursor] = useContext(CursorContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (image: string, index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
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

  return (
    <div className={styles.content}>
      <div className={styles.left}>
        {images && images.length > 0 && (
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
        )}
      </div>
      <div className={styles.right}>
        <h1 className={`project-title-1 ${styles.projectTitle}`}>{title}</h1>
        <h2 className={`project-subtitle-2 ${styles.jobTitle}`}>{job}</h2>
        <p className={`project-body-1 ${styles.description}`}>{description}</p>
        <h2 className={`project-subtitle-1 ${styles.fastFacts}`}>Fast facts:</h2>
        <div className={styles.factNodes}>
          {nodes.map((node, index) => (
            <span key={index} className={styles.projectNode}>
              {node}
            </span>
          ))}
        </div>
      </div>

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
              ×
            </button>
            {images.length > 1 && (
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
                  ‹
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
                  ›
                </button>
              </>
            )}
            <img
              src={selectedImage}
              alt="Full size project image"
              className={styles.imageModalImage}
            />
            {images.length > 1 && (
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

// import React from "react";
// import NodeDescription from "../../../components/node-description/node-description";
// import "./mayfest-site.css";

// interface MayfestSiteProps {
//   title: string;
//   job: string;
//   description: string;
//   images: string;
//   nodes: string[];
// }

// export const MayfestSite: React.FC<MayfestSiteProps> = ({
//   title,
//   job,
//   description,
//   images,
//   nodes,
// }: MayfestSiteProps) => {
//   return (
//     <div className="content">
//       <div className="left">
//         <img
//           src={images[0]}
//           alt="Mayfest site design"
//           className="project-image"
//         />
//       </div>
//       <div className="right">
//         <h1 className="project-title">{title}</h1>
//         <h2 className="job-title">{job}</h2>
//         <p className="description">{description}</p>
//         <h2 className="job-title">Fast facts:</h2>
//         <div className="nodes">
//           {
//             /* Map through nodes to create NodeDescription components */
//             nodes.map((node, index) => (
//               <NodeDescription
//                 key={index}
//                 className="project-node"
//                 text={node}
//               />
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   );
// };
