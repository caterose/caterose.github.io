import React, { useContext, useEffect, useState } from "react";
import useMousePosition from "../../hooks/use-mouse-position";
import { CursorContext } from "../../context/cursor-context";
import isTouchDevice from "../../utils/is-touch-device";

const Cursor: React.FC = () => {
  const { clientX, clientY } = useMousePosition();
  const [cursor] = useContext(CursorContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    document.body.addEventListener("mouseenter", handleEnter);
    document.body.addEventListener("mouseleave", handleLeave);

    return () => {
      document.body.removeEventListener("mouseenter", handleEnter);
      document.body.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <svg
        width={200}
        height={200}
        // width={50}
        // height={50}
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          pointerEvents: "none",
          left: clientX,
          top: clientY,
          transform: `translate(-50%, -50%)`, //scale(${cursor.active ? 2.5 : 1})`,
          // stroke: "var(--primary-blue-cursor)",
          // stroke: cursor.active
          //   ? "var(--primary-blue)"
          //   : "var(--neutral-white)",
          strokeWidth: 2.5, // strokeWidth: 1,
          fill: cursor.active
            ? "var(--secondary-green-cursor)"
            : "var(--primary-blue-cursor)",
          // fill: cursor.active
          //   ? "var(--neutral-white-cursor)"
          //   : "var(--primary-blue)",
          transition: "transform .2s ease-in-out",
          opacity: isVisible && clientX > 1 ? 1 : 0,
        }}
      >
        <circle cx="25" cy="25" r="8" />
      </svg>
    </div>
  );
};

export default Cursor;

/*

import React, { useContext, useEffect, useState } from "react";
import useMousePosition from "../../hooks/use-mouse-position";
import { CursorContext } from "../../context/cursor-context";
import isTouchDevice from "../../utils/is-touch-device";

const Cursor: React.FC = () => {
  const { clientX, clientY } = useMousePosition();
  const [cursor] = useContext(CursorContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    document.body.addEventListener("mouseenter", handleEnter);
    document.body.addEventListener("mouseleave", handleLeave);

    return () => {
      document.body.removeEventListener("mouseenter", handleEnter);
      document.body.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <svg
        width={50}
        height={50}
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          pointerEvents: "none",
          left: clientX,
          top: clientY,
          transform: `translate(-50%, -50%) scale(${cursor.active ? 2.5 : 1})`,
          stroke: cursor.active
            ? "var(--primary-blue)"
            : "var(--neutral-white)",
          strokeWidth: 1,
          fill: cursor.active
            ? "var(--neutral-white-cursor)"
            : "var(--primary-blue)",
          transition: "transform .2s ease-in-out",
          opacity: isVisible && clientX > 1 ? 1 : 0,
        }}
      >
        <circle cx="25" cy="25" r="8" />
      </svg>
    </div>
  );
};

export default Cursor;


*/
