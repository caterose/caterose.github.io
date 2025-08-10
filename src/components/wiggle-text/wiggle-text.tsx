import React, { useContext, useCallback, useState } from "react";
import { CursorContext } from "../../context/cursor-context";
import { useSpring, animated } from "@react-spring/web";

import "./wiggle-text.css";

// const pages = [
//   { label: "about.", path: "#about" },
//   { label: "experience.", path: "#experience" },
//   { label: "projects.", path: "#projects" },
//   { label: "contact.", path: "#contact" },
//   { label: "resume.", path: "#resume" },
// ];

interface WiggleTextProps {
  className: string;
  text: string;
}

const WiggleText: React.FC<WiggleTextProps> = ({
  className,
  text,
}: WiggleTextProps) => {
  const [, setCursor] = useContext(CursorContext);
  const [hovered, setHovered] = useState(false);

  const styles = useSpring({
    to: async (next) => {
      if (hovered) {
        while (hovered) {
          await next({ rotate: 3 });
          await next({ rotate: -3 });
          await next({ rotate: 0 });
        }
      } else {
        await next({ rotate: 0 });
      }
    },
    from: { rotate: 0 },
    config: { tension: 200, friction: 8 },
  });

  const activateCursor = useCallback(() => {
    setHovered(true);
    setCursor({ active: true });
  }, [setCursor]);

  const deactivateCursor = useCallback(() => {
    setHovered(false);
    setCursor({ active: false });
  }, [setCursor]);

  return (
    // <div
    //   className="nav-item"
    //   onMouseEnter={activateCursor}
    //   onMouseLeave={deactivateCursor}
    // >
    //   <a href={path}>
    <animated.span
      onMouseEnter={activateCursor}
      onMouseLeave={deactivateCursor}
      className={className}
      style={{ display: "inline-block", ...styles }}
    >
      {text}
    </animated.span>
    //   </a>
    // </div>
  );
};

export default WiggleText;
