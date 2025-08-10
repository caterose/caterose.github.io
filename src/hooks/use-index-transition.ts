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
    spring = { mass: 2, tension: 240, friction: 40 },
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

  const prop = axis === 'y' ? 'translateY' : 'translateX';

  const transitions = useTransition(activeIndex, {
    key: activeIndex,
    from: { transform: `${prop}(${direction === 'forward' ? from : `-${from}`})` },
    enter: { transform: `${prop}(${enter})` },
    leave: { transform: `${prop}(${direction === 'forward' ? `-${leave}` : leave})` },
    config: spring,
    onRest: () => {
      prevIndexRef.current = activeIndex;
    },
  });

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
