import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './gallery.module.css';

interface GallerySectionProps {
  images: string[]; // pass your own image URLs; if empty we'll fall back to picsum
  captions?: string[]; // optional captions matching images array
}

const ri = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const rf = (min: number, max: number) => Math.random() * (max - min) + min;

const MIN_SIZE = 250;
const MAX_SIZE = 450;
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

const GallerySection: React.FC<GallerySectionProps> = ({
  images,
  captions = [],
}: GallerySectionProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [activeCaption, setActiveCaption] = useState<string>('');
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
    const maxX = Math.max(0, dims.w - size);
    const maxY = Math.max(0, dims.h - size);
    const idx = ri(0, images.length - 1);
    const url = pickUrl(images, size);
    const caption = captions[idx] || '';

    const it: Item = {
      id: crypto.randomUUID(),
      x: ri(0, Math.floor(maxX)),
      y: ri(0, Math.floor(maxY)),
      size,
      rotate,
      url,
      caption,
    };
    setItems((prev) => [...prev, it]);
    setActiveCaption(caption);
  }, [dims.w, dims.h, images, captions]);

  //   const removeLast = useCallback(() => setItems((p) => p.slice(0, -1)), []);
  //   const clearAll = useCallback(() => {
  //     setItems([]);
  //     setActiveCaption('');
  //   }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || (e.key === ' ' && e.keyCode === 32)) {
        e.preventDefault();
        addItem();
      }
    };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [addItem]);

  return (
    <div className={styles.galleryPage}>
      <div
        ref={containerRef}
        className={`${(styles as any).canvas ?? ''}`}
        style={{
          //   position: 'relative',
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          //   width: '100%',
          //   height: '100vh',
          //   border: '2px solid red',
        }}
      >
        {items.length === 0 && (
          <div className={styles.text}>press the space bar to see some adventures!</div>
        )}

        {items.map((it) => (
          <img
            key={it.id}
            src={it.url}
            alt="random"
            draggable={false}
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
              transform: `rotate(${it.rotate}deg)`,
              transition: 'transform 180ms ease, opacity 180ms ease',
              opacity: 1,
            }}
            onLoad={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.animate(
                [
                  {
                    transform: `translateY(-12px) scale(.92) rotate(${it.rotate - 8}deg)`,
                    opacity: 0,
                  },
                  { transform: `translateY(0px) scale(1) rotate(${it.rotate}deg)`, opacity: 1 },
                ],
                { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' },
              );
            }}
          />
        ))}

        {/* {activeCaption && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              background: 'white',
              padding: '8px 12px',
              borderTop: '1px solid rgba(0,0,0,.1)',
              boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {activeCaption}
          </div>
        )} */}
      </div>
      {activeCaption && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            background: 'var(--neutral-white)',
            color: 'var(--primary-blue)',

            padding: '8px 12px',
            borderTop: '1px solid var(--primary-blue)',
            //   borderTop: '1px solid rgba(0,0,0,.1)',
            //   boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
            fontSize: 16,
            textAlign: 'center',
          }}
        >
          {activeCaption}
        </div>
      )}
    </div>
  );
};

export default GallerySection;

// import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
// import styles from './gallery.module.css';

// interface GallerySectionProps {
//   images: string[]; // pass your own image URLs; if empty we'll fall back to picsum
//   captions?: string[]; // optional captions matching images array
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

// const GallerySection: React.FC<GallerySectionProps> = ({
//   images,
//   captions = [],
// }: GallerySectionProps) => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [activeCaption, setActiveCaption] = useState<string>('');
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
//     const caption = captions[idx] || '';

//     const it: Item = {
//       id: crypto.randomUUID(),
//       x: ri(0, Math.floor(maxX)),
//       y: ri(0, Math.floor(maxY)),
//       size,
//       rotate,
//       url,
//       caption,
//     };
//     setItems((prev) => [...prev, it]);
//     setActiveCaption(caption);
//   }, [dims.w, dims.h, images, captions]);

//   //   const removeLast = useCallback(() => setItems((p) => p.slice(0, -1)), []);
//   //   const clearAll = useCallback(() => {
//   //     setItems([]);
//   //     setActiveCaption('');
//   //   }, []);

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
//           position: 'relative',
//           width: '100%',
//           height: '100vh',
//         }}
//       >
//         {items.length === 0 && (
//           <div className={styles.text}>press the space bar to see some adventures!</div>
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

//         {activeCaption && (
//           <div
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               left: 0,
//               width: '100%',
//               background: 'white',
//               padding: '8px 12px',
//               borderTop: '1px solid rgba(0,0,0,.1)',
//               boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
//               fontSize: 14,
//               textAlign: 'center',
//             }}
//           >
//             {activeCaption}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GallerySection;
