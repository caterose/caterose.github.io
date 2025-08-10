import { createContext } from "react";

export type CursorState = { active: boolean };

export type CursorContextType = [
  CursorState,
  React.Dispatch<React.SetStateAction<CursorState>>,
];

export const CursorContext = createContext<CursorContextType>([
  { active: false },
  () => {},
]);
