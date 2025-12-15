import { useState, useEffect, useContext } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { CursorContext } from '../../context/cursor-context';
import './image-swap.css';

interface Images {
  image1: string;
  image2: string;
}

const ImageSwapSpring: React.FC<Images> = ({ image1, image2 }: Images) => {
  const [, setCursor] = useContext(CursorContext);
  const [flipped, setFlipped] = useState(false);
  const [zIndexTop, setZIndexTop] = useState<'img1' | 'img2'>('img1');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setZIndexTop(flipped ? 'img2' : 'img1');
    }, 100);

    return () => clearTimeout(timeout);
  }, [flipped]);

  const commonConfig = { tension: 200, friction: 20 };

  const img1Spring = useSpring({
    transform: flipped ? 'scale(1)' : 'scale(1.05)',
    config: commonConfig,
  });

  const img2Spring = useSpring({
    transform: flipped ? 'scale(1.05)' : 'scale(1)',
    config: commonConfig,
  });

  return (
    <div
      className="image-container"
      onClick={() => setFlipped((prev) => !prev)}
      onMouseEnter={() => setCursor({ active: true })}
      onMouseLeave={() => setCursor({ active: false })}
    >
      <div className="images">
        <animated.img
          src={image1}
          className="image image1"
          style={{
            ...img1Spring,
            zIndex: zIndexTop === 'img1' ? 2 : 1,
          }}
          alt="Image 1"
        />
        <animated.img
          src={image2}
          className="image image2"
          style={{
            ...img2Spring,
            zIndex: zIndexTop === 'img2' ? 2 : 1,
          }}
          alt="Image 2"
        />
      </div>
      <h3 className="subtitle">press to flip</h3>
    </div>
  );
};

export default ImageSwapSpring;

// import { useState } from "react";
// import { useSpring, animated } from "@react-spring/web";
// import "./image-swap.css";

// const ImageSwapSpring: React.FC = () => {
//   const [flipped, setFlipped] = useState(false);

//   const img1Spring = useSpring({
//     transform: flipped ? "scale(1)" : "scale(1.05)",
//     zIndex: flipped ? 1 : 2,
//     config: { tension: 200, friction: 20 },
//   });

//   const img2Spring = useSpring({
//     transform: flipped ? "scale(1.05)" : "scale(1)",
//     zIndex: flipped ? 2 : 1,
//     config: { tension: 200, friction: 20 },
//   });

//   return (
//     <div
//       className="image-container"
//       onClick={() => setFlipped((prev) => !prev)}
//     >
//       <animated.img
//         src="/public/phone.png"
//         className="image image1"
//         style={img1Spring}
//         alt="Image 1"
//       />
//       <animated.img
//         src="/public/picture-of-me.svg"
//         className="image image2"
//         style={img2Spring}
//         alt="Image 2"
//       />
//     </div>
//   );
// };

// export default ImageSwapSpring;
