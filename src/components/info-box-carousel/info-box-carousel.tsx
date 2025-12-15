import { useRef, useContext } from 'react';
import InfoBox from '../info-box/info-box';
import type { InfoBoxProps } from '../info-box/info-box'; // ✅ FIXED

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { CursorContext } from '../../context/cursor-context';

import { useIsMobile } from '../../hooks/use-is-mobile';

import './info-box-carousel.css';

interface BoxCarouselProps {
  boxes: InfoBoxProps[];
}

export default function BoxCarousel({ boxes }: BoxCarouselProps) {
  const [, setCursor] = useContext(CursorContext);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 250; // adjust to match card width + gap
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const isMobile = useIsMobile();

  return (
    <div className="box-carousel">
      {!isMobile && (
        <div className="scroll-btn">
          <ArrowCircleLeftIcon
            onClick={() => scroll('left')}
            onMouseEnter={() => setCursor({ active: true })}
            onMouseLeave={() => setCursor({ active: false })}
            className="button-icon"
            style={{
              color: 'var(--primary-purple)',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
            }}
          />
        </div>
      )}
      <div className="inner-box">
        <div className="blur-over b-left" />
        <div className="boxes" ref={scrollRef}>
          {boxes.map((boxProps, i) => (
            <InfoBox key={i} {...boxProps} />
          ))}
        </div>
        <div className="blur-over b-right" />
      </div>

      {!isMobile && (
        <div className="scroll-btn">
          <ArrowCircleRightIcon
            onClick={() => scroll('right')}
            onMouseEnter={() => setCursor({ active: true })}
            onMouseLeave={() => setCursor({ active: false })}
            className="button-icon"
            style={{
              color: 'var(--primary-purple)',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
            }}
          />
        </div>
      )}
    </div>
  );
}
