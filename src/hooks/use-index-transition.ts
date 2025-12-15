// hooks/useIndexTransition.ts
import { useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';

type Axis = 'x' | 'y';

export function useIndexTransition(
  length: number,
  {
    axis = 'y',
    enter = '0%',
    from = '100%',
    leave = '50%',
    enableKeyboard = true,
    spring = { mass: 1.2, tension: 280, friction: 50 },
  }: {
    axis?: Axis;
    enter?: string;
    from?: string;
    leave?: string;
    enableKeyboard?: boolean;
    spring?: { mass: number; tension: number; friction: number };
  } = {},
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const direction = activeIndex > prevIndexRef.current ? 'forward' : 'backward';

  // Use translate3d for hardware acceleration
  const getTransform = (value: string) => {
    if (axis === 'y') {
      return `translate3d(0, ${value}, 0)`;
    } else {
      return `translate3d(${value}, 0, 0)`;
    }
  };

  const transitions = useTransition(activeIndex, {
    key: activeIndex,

    // First render only: start at final position but invisible
    initial: { opacity: 0, transform: getTransform(enter) },

    // Subsequent transitions
    from: { 
      opacity: 0, 
      transform: getTransform(direction === 'forward' ? from : `-${from}`)
    },
    enter: { 
      opacity: 1, 
      transform: getTransform(enter)
    },
    leave: { 
      opacity: 0, 
      transform: getTransform(direction === 'forward' ? `-${leave}` : leave)
    },

    config: spring,
    onRest: () => {
      prevIndexRef.current = activeIndex;
    },
  });

  // const transitions = useTransition(activeIndex, {
  //   key: activeIndex,
  //   from: { transform: `${prop}(${direction === 'forward' ? from : `-${from}`})` },
  //   enter: { transform: `${prop}(${enter})` },
  //   leave: { transform: `${prop}(${direction === 'forward' ? `-${leave}` : leave})` },
  //   config: spring,
  //   onRest: () => {
  //     prevIndexRef.current = activeIndex;
  //   },
  // });

  const goNext = () => setActiveIndex((i) => Math.min(i + 1, length - 1));
  const goPrev = () => setActiveIndex((i) => Math.max(i - 1, 0));
  const goTo = (i: number) => setActiveIndex(Math.max(0, Math.min(i, length - 1)));

  // Optional keyboard nav
  useEffect(() => {
    if (!enableKeyboard) return;
    const onKey = (e: KeyboardEvent) => {
      if (axis === 'y') {
        if (e.key === 'ArrowDown') goNext();
        if (e.key === 'ArrowUp') goPrev();
      } else {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [axis, enableKeyboard, length]);

  return { transitions, activeIndex, goNext, goPrev, goTo, setActiveIndex };
}
