import React, { useRef, useLayoutEffect, useState } from 'react';
// import NodeDescription from '../../../components/node-description/node-description';
import MarqueeRow from '../../../components/marquee-row/marquee-row';
import styles from './hello.module.css';

interface HelloProps {
  interests: string[][];
  //   bkgdImages: string[];
}

const Hello: React.FC<HelloProps> = ({ interests }: HelloProps) => {
  const helloRef = useRef<HTMLHeadingElement>(null);
  const [helloWidth, setHelloWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (helloRef.current) {
      setHelloWidth(helloRef.current.offsetWidth);
    }
  }, []);
  return (
    <div className={styles.helloPage}>
      <div className={styles.header}>
        <div className={styles.helloDiv}>
          <div className={styles.title}>
            <h1 ref={helloRef} className={styles.hello}>
              HI. I'M <span>CATE ROSE.</span>
            </h1>
            <h3 className={styles.subtitle}>(programmer, historian, artist, nerd) </h3>

            <p className={styles.background} style={helloWidth ? { width: helloWidth } : undefined}>
              I’m from San Francisco, Toronto, and Evanston, IL! I’m a double major at Northwestern
              University studying Computer Science and Global history but, as you can see below, I
              have a lot of interests :)
            </p>
          </div>
        </div>
        {/* <div className={styles.image}>
          <img style={{ width: '200px' }} src="/public/me.svg" />
        </div> */}
      </div>
      <div className={styles.interestsDiv}>
        {/* <h1>HELLO</h1> */}
        {/* <MarqueeRow items={interests[0]} speed={90} /> */}
        <MarqueeRow items={interests[0]} speed={90} />
        <MarqueeRow items={interests[1]} speed={70} reverse />
        {/* <MarqueeRow items={interests[2] ?? interests[1]} speed={110} /> */}
      </div>
    </div>
  );
};

export default Hello;
