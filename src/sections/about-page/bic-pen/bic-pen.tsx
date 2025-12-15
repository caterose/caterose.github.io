import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './bic-pen.module.css';

interface PenDrawingGalleryProps {
  images: string[]; // pass your own image URLs; if empty we'll fall back to picsum
  // captions?: string[]; // optional captions matching images array
}

const ri = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const rf = (min: number, max: number) => Math.random() * (max - min) + min;

const MIN_SIZE = 350;
const MAX_SIZE = 550;
const MAX_ROTATE = 40;

interface Item {
  id: string;
  x: number;
  y: number;
  size: number;
  rotate: number;
  url: string;
  caption?: string;
}

const pickUrl = (images: string[], size: number) => {
  if (images && images.length) {
    return images[ri(0, images.length - 1)];
  }
};

const PenDrawingGallery: React.FC<PenDrawingGalleryProps> = ({
  images,
  // captions = [],
}: PenDrawingGalleryProps) => {
  const [items, setItems] = useState<Item[]>([]);
  // const [activeCaption, setActiveCaption] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setDims({ w: r.width, h: r.height });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const addItem = useCallback(() => {
    if (!dims.w || !dims.h) return;
    const size = ri(MIN_SIZE, MAX_SIZE);
    const rotate = rf(-MAX_ROTATE, MAX_ROTATE);
    // Allow images to extend to edges and slightly beyond for full screen coverage
    const maxX = dims.w;
    const maxY = dims.h;
    const idx = ri(0, images.length - 1);
    const url = pickUrl(images, size);
    // const caption = captions[idx] || '';

    const it: Item = {
      id: crypto.randomUUID(),
      // Allow positioning from negative (extends beyond left/top) to full width/height
      x: ri(-size * 0.3, Math.floor(maxX - size * 0.7)),
      y: ri(-size * 0.3, Math.floor(maxY - size * 0.7)),
      size,
      rotate,
      url,
      // caption,
    };

    // Keep at most 4 images on screen by dropping the oldest when adding a new one
    setItems((prev) => {
      const next = [...prev, it];
      if (next.length > 4) next.shift();
      return next;
    });
    // setActiveCaption(caption);
  }, [dims.w, dims.h, images]); //captions

  // Debounce rapid spacebar presses
  const addItemRef = useRef<number | null>(null);
  const debouncedAddItem = useCallback(() => {
    if (addItemRef.current) {
      window.clearTimeout(addItemRef.current);
    }
    addItemRef.current = window.setTimeout(() => {
      addItem();
    }, 100); // 100ms debounce
  }, [addItem]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || (e.key === ' ' && e.keyCode === 32)) {
        e.preventDefault();
        debouncedAddItem();
      }
    };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (addItemRef.current) {
        window.clearTimeout(addItemRef.current);
      }
    };
  }, [debouncedAddItem]);

  return (
    <div className={styles.galleryPage}>
      <div
        ref={containerRef}
        className={`${(styles as any).canvas ?? ''}`}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        {items.length === 0 ? (
          // <div className={styles.text}>
          //   PRESS THE <span>SPACE BAR.</span>
          // </div>
          <div className={styles.text}>
            <div className={styles.line}>
              PRESS THE <span>SPACE BAR.</span>
            </div>
          </div>
        ) : (
          <h1 className={styles.name}>CATE ROSE</h1>
        )}

        {items.map((it) => (
          <img
            key={it.id}
            src={it.url}
            alt="random"
            draggable={false}
            loading="eager"
            style={{
              position: 'absolute',
              left: it.x,
              top: it.y,
              width: it.size,
              height: it.size,
              objectFit: 'cover',
              borderRadius: 16,
              boxShadow: '0 6px 18px rgba(0,0,0,.15)',
              userSelect: 'none',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: `translate3d(0, -12px, 0) scale(0.92) rotate(${it.rotate - 8}deg)`,
              opacity: 0,
            }}
            onLoad={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              // Use requestAnimationFrame to ensure smooth animation start
              requestAnimationFrame(() => {
                el.animate(
                  [
                    {
                      transform: `translate3d(0, -12px, 0) scale(0.92) rotate(${it.rotate - 8}deg)`,
                      opacity: 0,
                    },
                    { 
                      transform: `translate3d(0, 0, 0) scale(1) rotate(${it.rotate}deg)`, 
                      opacity: 1 
                    },
                  ],
                  { 
                    duration: 300, 
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    fill: 'forwards'
                  },
                ).onfinish = () => {
                  // Update inline style after animation completes to prevent conflicts
                  el.style.transform = `translate3d(0, 0, 0) scale(1) rotate(${it.rotate}deg)`;
                  el.style.opacity = '1';
                };
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PenDrawingGallery;

// import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
// import styles from './bic-pen.module.css';

// interface PenDrawingGalleryProps {
//   images: string[]; // pass your own image URLs; if empty we'll fall back to picsum
//   // captions?: string[]; // optional captions matching images array
// }

// const ri = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
// const rf = (min: number, max: number) => Math.random() * (max - min) + min;

// const MIN_SIZE = 250;
// const MAX_SIZE = 450;
// const MAX_ROTATE = 40;

// interface Item {
//   id: string;
//   x: number;
//   y: number;
//   size: number;
//   rotate: number;
//   url: string;
//   caption?: string;
// }

// const pickUrl = (images: string[], size: number) => {
//   if (images && images.length) {
//     return images[ri(0, images.length - 1)];
//   }
// };

// const PenDrawingGallery: React.FC<PenDrawingGalleryProps> = ({
//   images,
//   // captions = [],
// }: PenDrawingGalleryProps) => {
//   const [items, setItems] = useState<Item[]>([]);
//   // const [activeCaption, setActiveCaption] = useState<string>('');
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [dims, setDims] = useState({ w: 0, h: 0 });

//   const measure = useCallback(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     const r = el.getBoundingClientRect();
//     setDims({ w: r.width, h: r.height });
//   }, []);

//   useLayoutEffect(() => {
//     measure();
//     const ro = new ResizeObserver(measure);
//     if (containerRef.current) ro.observe(containerRef.current);
//     return () => ro.disconnect();
//   }, [measure]);

//   const addItem = useCallback(() => {
//     if (!dims.w || !dims.h) return;
//     const size = ri(MIN_SIZE, MAX_SIZE);
//     const rotate = rf(-MAX_ROTATE, MAX_ROTATE);
//     const maxX = Math.max(0, dims.w - size);
//     const maxY = Math.max(0, dims.h - size);
//     const idx = ri(0, images.length - 1);
//     const url = pickUrl(images, size);
//     // const caption = captions[idx] || '';

//     const it: Item = {
//       id: crypto.randomUUID(),
//       x: ri(0, Math.floor(maxX)),
//       y: ri(0, Math.floor(maxY)),
//       size,
//       rotate,
//       url,
//       // caption,
//     };
//     setItems((prev) => [...prev, it]);
//     // setActiveCaption(caption);
//   }, [dims.w, dims.h, images]); //captions

//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.code === 'Space' || (e.key === ' ' && e.keyCode === 32)) {
//         e.preventDefault();
//         addItem();
//       }
//     };

//     window.addEventListener('keydown', onKeyDown, { passive: false });
//     return () => window.removeEventListener('keydown', onKeyDown);
//   }, [addItem]);

//   return (
//     <div className={styles.galleryPage}>
//       <div
//         ref={containerRef}
//         className={`${(styles as any).canvas ?? ''}`}
//         style={{
//           position: 'absolute',
//           top: '0',
//           left: '0',
//           width: '100%',
//           height: '100%',
//         }}
//       >
//         {items.length === 0 ? (
//           // <div className={styles.text}>
//           //   PRESS THE <span>SPACE BAR.</span>
//           // </div>
//           <div className={styles.text}>
//             <div className={styles.line}>
//               PRESS THE <span>SPACE BAR.</span>
//             </div>
//           </div>
//         ) : (
//           <h1 className={styles.name}>CATE ROSE</h1>
//         )}

//         {items.map((it) => (
//           <img
//             key={it.id}
//             src={it.url}
//             alt="random"
//             draggable={false}
//             style={{
//               position: 'absolute',
//               left: it.x,
//               top: it.y,
//               width: it.size,
//               height: it.size,
//               objectFit: 'cover',
//               borderRadius: 16,
//               boxShadow: '0 6px 18px rgba(0,0,0,.15)',
//               userSelect: 'none',
//               transform: `rotate(${it.rotate}deg)`,
//               transition: 'transform 180ms ease, opacity 180ms ease',
//               opacity: 1,
//             }}
//             onLoad={(e) => {
//               const el = e.currentTarget as HTMLImageElement;
//               el.animate(
//                 [
//                   {
//                     transform: `translateY(-12px) scale(.92) rotate(${it.rotate - 8}deg)`,
//                     opacity: 0,
//                   },
//                   { transform: `translateY(0px) scale(1) rotate(${it.rotate}deg)`, opacity: 1 },
//                 ],
//                 { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' },
//               );
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PenDrawingGallery;
