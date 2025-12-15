import React, { createContext, useContext } from 'react';
import type { PageItem } from '../components/page-mapping/page-mapping';

interface ProjectContextType {
  projects: PageItem[];
  activeIndex: number;
  goTo: (index: number) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  projects: PageItem[];
  activeIndex: number;
  goTo: (index: number) => void;
  children: React.ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  projects,
  activeIndex,
  goTo,
  children,
}) => {
  return (
    <ProjectContext.Provider value={{ projects, activeIndex, goTo }}>
      {children}
    </ProjectContext.Provider>
  );
};

