import React, { useRef, useLayoutEffect, useState, useEffect, useMemo, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import NodeDescription from '../node-description/node-description';
import styles from './marquee-row.module.css';

interface MarqueeRowProps {
  items: string[];
  speed?: number; // px/sec
  gap?: number;
  reverse?: boolean;
  className?: string;
  hoverOnly?: boolean; // only move on hover
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  items,
  speed = 80,
  gap = 16,
  reverse = false,
  className,
  hoverOnly = true,
}) => {
  const measureRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [{ t }, api] = useSpring(() => ({ t: 0 }));

  // measure a hidden, static copy (include join gap)
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () => setWidth(el.scrollWidth + gap);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [items, gap]);

  // start loop FROM current position (no reset)
  const startLoop = useCallback(() => {
    if (!width || speed <= 0) return;

    const chunk = width; // one seamless cycle (copy + gap)
    const msPerPx = 1000 / speed;

    api.stop(); // stop any prior run

    api.start({
      to: async (next) => {
        let curr = t.get(); // wherever we currently are
        while (true) {
          const nextTarget = reverse ? curr - chunk : curr + chunk;
          const duration = Math.abs(nextTarget - curr) * msPerPx;
          await next({ t: nextTarget, config: { duration } });
          curr = nextTarget; // advance anchor for the next leg
        }
      },
      reset: false,
    });
  }, [api, t, width, speed, reverse]);

  // stop loop but keep position (no snap back)
  const stopLoop = useCallback(() => {
    api.stop();
    // keep t as-is
  }, [api]);

  // If not hoverOnly, auto-run once mounted
  useEffect(() => {
    if (hoverOnly) return;
    if (!width || speed <= 0) return;
    startLoop();
    return () => stopLoop();
  }, [hoverOnly, width, speed, startLoop, stopLoop]);

  const Row = useMemo(
    () => (
      <div className={styles.rowCopy} style={{ gap }}>
        {items.map((txt, i) => (
          <NodeDescription key={`${txt}-${i}`} className="class-node" text={txt} />
        ))}
      </div>
    ),
    [items, gap],
  );

  return (
    <div
      className={`${styles.marqueeViewport} ${className ?? ''}`}
      onMouseEnter={() => hoverOnly && startLoop()}
      onMouseLeave={() => hoverOnly && stopLoop()}
    >
      {/* hidden measurer */}
      <div className={styles.measure} ref={measureRef} aria-hidden>
        {Row}
      </div>

      <animated.div
        className={styles.innerTrack}
        style={{
          transform: t.to((v) => {
            if (!width) return 'translate3d(0,0,0)';
            const d = reverse ? -width : width;
            const wrapped = ((v % d) + d) % d; // safe modulo so visual never jumps
            return `translate3d(${reverse ? wrapped : -wrapped}px,0,0)`;
          }),
        }}
      >
        {/* first copy with trailing gap */}
        <div style={{ marginRight: gap }}>{Row}</div>
        {/* duplicate copy with trailing gap */}
        <div style={{ marginRight: gap }} aria-hidden>
          {Row}
        </div>
      </animated.div>
    </div>
  );
};

export default MarqueeRow;

// // MarqueeRow.tsx
// import React, { useRef, useLayoutEffect, useState, useEffect, useMemo, useCallback } from 'react';
// import { useSpring, animated } from '@react-spring/web';
// import NodeDescription from '../node-description/node-description';
// import styles from './marquee-row.module.css';

// interface MarqueeRowProps {
//   items: string[];
//   speed?: number; // px/sec
//   gap?: number;
//   reverse?: boolean;
//   className?: string;
//   hoverOnly?: boolean; // only move on hover
// }

// const MarqueeRow: React.FC<MarqueeRowProps> = ({
//   items,
//   speed = 80,
//   gap = 16,
//   reverse = false,
//   className,
//   hoverOnly = true,
// }) => {
//   const measureRef = useRef<HTMLDivElement>(null);
//   const [width, setWidth] = useState(0);
//   const [{ t }, api] = useSpring(() => ({ t: 0 }));

//   // measure a hidden, static copy
//   useLayoutEffect(() => {
//     const el = measureRef.current;
//     if (!el) return;
//     const measure = () => setWidth(el.scrollWidth);
//     measure();
//     const ro = new ResizeObserver(measure);
//     ro.observe(el);
//     window.addEventListener('resize', measure);
//     return () => {
//       ro.disconnect();
//       window.removeEventListener('resize', measure);
//     };
//   }, [items]);

//   // start loop FROM current position (no reset)
//   const startLoop = useCallback(() => {
//     if (!width || speed <= 0) return;

//     const chunk = width; // one seamless cycle
//     const msPerPx = 1000 / speed;

//     api.stop(); // stop any prior run

//     api.start({
//       to: async (next) => {
//         let curr = t.get(); // wherever we currently are
//         while (true) {
//           const nextTarget = reverse ? curr - chunk : curr + chunk;
//           const duration = Math.abs(nextTarget - curr) * msPerPx;
//           await next({ t: nextTarget, config: { duration } });
//           curr = nextTarget; // advance anchor for the next leg
//         }
//       },
//       // IMPORTANT: do NOT reset or provide from:{t:0}
//       reset: false,
//     });
//   }, [api, t, width, speed, reverse]);

//   // stop loop but keep position (no snap back)
//   const stopLoop = useCallback(() => {
//     api.stop();
//     // DO NOT set t back to 0
//   }, [api]);

//   // If not hoverOnly, auto-run once mounted & whenever width/speed change
//   useEffect(() => {
//     if (hoverOnly) return;
//     if (!width || speed <= 0) return;
//     startLoop();
//     return () => stopLoop();
//   }, [hoverOnly, width, speed, startLoop, stopLoop]);

//   const Row = useMemo(
//     () => (
//       <div className={styles.rowCopy} style={{ gap }}>
//         {items.map((txt, i) => (
//           <NodeDescription key={`${txt}-${i}`} className="class-node" text={txt} />
//         ))}
//       </div>
//     ),
//     [items, gap],
//   );

//   return (
//     <div
//       className={`${styles.marqueeViewport} ${className ?? ''}`}
//       onMouseEnter={() => hoverOnly && startLoop()}
//       onMouseLeave={() => hoverOnly && stopLoop()}
//     >
//       {/* hidden measurer */}
//       <div className={styles.measure} ref={measureRef} aria-hidden>
//         {Row}
//       </div>

//       <animated.div
//         className={styles.innerTrack}
//         style={{
//           transform: t.to((v) => {
//             if (!width) return 'translate3d(0,0,0)';
//             const d = reverse ? -width : width;
//             const wrapped = ((v % d) + d) % d; // safe modulo so visual never jumps
//             return `translate3d(${reverse ? wrapped : -wrapped}px,0,0)`;
//           }),
//         }}
//       >
//         {Row}
//         {/* duplicate for seamless fill */}
//         <div className={styles.rowCopy} aria-hidden style={{ gap }}>
//           {items.map((txt, i) => (
//             <NodeDescription key={`ghost-${txt}-${i}`} className="class-node" text={txt} />
//           ))}
//         </div>
//       </animated.div>
//     </div>
//   );
// };

// export default MarqueeRow;
