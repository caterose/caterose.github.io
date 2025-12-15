import { createContext } from 'react';

export type CursorState = { active: boolean; pressing?: boolean };

export type CursorContextType = [CursorState, React.Dispatch<React.SetStateAction<CursorState>>];

export const CursorContext = createContext<CursorContextType>([
  { active: false, pressing: false },
  () => {},
]);
