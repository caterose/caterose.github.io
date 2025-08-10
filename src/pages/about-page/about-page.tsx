import React, { useState, useRef, useEffect } from 'react';
import { useTransition } from '@react-spring/web';
import { useIndexTransition } from '../../hooks/use-index-transition';
import PageMapping from '../../components/page-mapping/page-mapping';
import type { PageItem } from '../../components/page-mapping/page-mapping';
import styles from './about-page.module.css';

interface AboutProps {
  pages: PageItem[];
}

const AboutPage = ({ pages }: { pages: PageItem[] }) => {
  const { transitions, activeIndex, goTo } = useIndexTransition(pages.length, {
    axis: 'y', // or 'x'
    // tweak spring/offsets if you want
  });

  return (
    <div className={styles.navProjects}>
      <div className={styles.projectContent}>
        <div className={styles.projectNav}>
          {pages.map((_, i) => (
            <div
              key={i}
              className={`${styles.navDot} ${i === activeIndex ? styles.active : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <PageMapping transitions={transitions} items={pages} />
      </div>
    </div>
  );
};

export default AboutPage;

// const AboutPage: React.FC<AboutProps> = ({ pages }: AboutProps) => {
//   const [navVisible, setNavVisible] = useState(true);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const prevIndexRef = useRef(0);
//   const direction = activeIndex > prevIndexRef.current ? 'down' : 'up';

//   const transitions = useTransition(activeIndex, {
//     key: activeIndex,
//     from: {
//       transform: direction === 'down' ? 'translateY(100%)' : 'translateY(-100%)',
//     },
//     enter: { transform: 'translateY(0%)' },
//     leave: {
//       transform: direction === 'down' ? 'translateY(-50%)' : 'translateY(50%)',
//     },
//     config: { mass: 2, tension: 240, friction: 40 },
//     onRest: () => {
//       prevIndexRef.current = activeIndex;
//     },
//   });

//   // 🔑 Add keyboard arrow navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowDown') {
//         setActiveIndex((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
//       } else if (e.key === 'ArrowUp') {
//         setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [pages.length]);

//   // const INTERVAL = 1.2; // seconds each image is fully shown
//   // const TOTAL = bkgdImages.length * INTERVAL; // one full cycle length
//   // const many = bkgdImages.length > 1;
//   return (
//     <>
//       <div className={styles.navProjects}>
//         <div className={styles.projectContent}>
//           {/* Navigation - shown only if navVisible is true */}
//           {navVisible && (
//             <div className={styles.projectNav}>
//               {pages.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`${styles.navDot} ${index === activeIndex ? styles.active : ''}`}
//                   onClick={() => setActiveIndex(index)}
//                 />
//               ))}
//             </div>
//           )}

//           <PageMapping transitions={transitions} items={pages} />
//         </div>
//       </div>
//       <PageMapping />
//     </>
//   );
// };

// export default AboutPage;

// ! ============

// import React from 'react';
// import styles from './about-page.module.css';

// interface AboutProps {
//   bkgdImages: string[];
//   // test: "About Page"
// }

// const AboutPage: React.FC<AboutProps> = ({ bkgdImages }: AboutProps) => {
//   const INTERVAL = 1.2; // seconds each image is fully shown
//   const TOTAL = bkgdImages.length * INTERVAL; // one full cycle length
//   const many = bkgdImages.length > 1;
//   return (
//     <div className={styles.frame}>
//       {bkgdImages.map((src, i) => (
//         <img
//           key={`${src}-${i}`}
//           src={src}
//           className={`${styles.layer} ${many ? styles.flash : ''}`}
//           style={
//             many
//               ? { animationDuration: `${TOTAL}s`, animationDelay: `${i * INTERVAL}s` }
//               : undefined
//           }
//           alt=""
//         />
//       ))}

//       <img src="/ctvBkgd.svg" className={styles.overlay} alt="" />
//     </div>
//   );
// };

// export default AboutPage;
