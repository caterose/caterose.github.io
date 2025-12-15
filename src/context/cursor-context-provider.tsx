import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { CursorContext } from './cursor-context';
import type { CursorState } from './cursor-context';

interface Props {
  children: ReactNode;
}

const CursorContextProvider: React.FC<Props> = ({ children }) => {
  const [cursor, setCursor] = useState<CursorState>({ active: false, pressing: false });

  return <CursorContext.Provider value={[cursor, setCursor]}>{children}</CursorContext.Provider>;
};

export default CursorContextProvider;
