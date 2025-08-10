import { useContext, useCallback } from "react";
import { CursorContext } from "../context/cursor-context";
import isTouchDevice from "../utils/is-touch-device";

type Options = {
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

const useCursorHandlers = (options: Options = {}) => {
  const [, setCursor] = useContext(CursorContext); // ✅ always call this

  const toggleCursor = useCallback(() => {
    setCursor((prev) => ({ active: !prev.active }));
  }, [setCursor]);

  const onMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      options.onMouseEnter?.(e);
      toggleCursor();
    },
    [options, toggleCursor],
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      options.onMouseLeave?.(e);
      toggleCursor();
    },
    [options, toggleCursor],
  );

  // ✅ conditionally return original options after hook setup
  if (isTouchDevice) return options;

  return { onMouseEnter, onMouseLeave };
};

export default useCursorHandlers;
