import React, { useState, useContext } from 'react';
import { CursorContext } from '../../context/cursor-context';
import styles from './simple-image-grid.module.css';

interface SimpleImageGridProps {
  images: string[];
}

const SimpleImageGrid: React.FC<SimpleImageGridProps> = ({ images }) => {
  const [, setCursor] = useContext(CursorContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Debug: log images
  console.log('SimpleImageGrid received images:', images);
  console.log('SimpleImageGrid rendering with', images?.length || 0, 'images');

  if (!images || images.length === 0) {
    return (
      <div style={{ padding: '20px', color: 'red', fontSize: '24px', border: '5px solid red' }}>
        No images provided
      </div>
    );
  }

  // Calculate grid columns
  const getColumns = () => {
    if (images.length <= 2) return 2;
    if (images.length <= 4) return 2;
    if (images.length <= 9) return 3;
    return 4;
  };

  const columns = getColumns();

  return (
    <>
      <div
        className={styles.gridContainer}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridAutoRows: 'minmax(200px, auto)',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.imageWrapper}
            onClick={() => setSelectedImage(image)}
            onMouseEnter={() => setCursor({ active: true })}
            onMouseLeave={() => setCursor({ active: false })}
          >
            <img
              src={image}
              alt={`Screenshot ${index + 1}`}
              className={styles.image}
              onError={(e) => {
                console.error('Image failed to load:', image);
                (e.target as HTMLImageElement).style.border = '5px solid yellow';
              }}
              onLoad={() => console.log('Image loaded:', image)}
            />
          </div>
        ))}
      </div>

      {/* Simple modal */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedImage(null)}
              onMouseEnter={() => setCursor({ active: true })}
              onMouseLeave={() => setCursor({ active: false })}
            >
              ×
            </button>
            <img src={selectedImage} alt="Full size" className={styles.modalImage} />
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleImageGrid;
