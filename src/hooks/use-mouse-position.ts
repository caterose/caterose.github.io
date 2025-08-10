import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState({ clientX: 0, clientY: 0 });

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      setPosition({ clientX: event.clientX, clientY: event.clientY });
    };

    document.body.addEventListener("mousemove", updatePosition);
    document.body.addEventListener("mouseenter", updatePosition);

    return () => {
      document.body.removeEventListener("mousemove", updatePosition);
      document.body.removeEventListener("mouseenter", updatePosition);
    };
  }, []);

  return position;
};

export default useMousePosition;
