import React from 'react';
import styles from './static.module.css';

interface StaticProps {
  // No props needed - just pure static effects
}

const StaticTransition: React.FC<StaticProps> = () => {
  return (
    <div className={styles.staticOverlay}>
      <div className={styles.staticBase}></div>
      <div className={styles.scanlines}></div>
      <div className={styles.noiseOverlay}></div>
      <div className={styles.flicker}></div>
    </div>
  );
};

export default StaticTransition;

// import React from 'react';
// import styles from './static.module.css';

// interface StaticProps {
//   images: string[];
// }

// const StaticTransition: React.FC<StaticProps> = ({ images }: StaticProps) => {
//   return (
//     <div className={styles.staticOverlay}>
//       {images.map((src, index) => (
//         <img key={index} src={src} />
//       ))}
//     </div>
//   );
// };

// export default StaticTransition;
