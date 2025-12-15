import { useContext, useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import './project-page.css';
import type { PageItem } from '../../components/page-mapping/page-mapping';
import { ProjectProvider } from '../../contexts/project-context';
import { CursorContext } from '../../context/cursor-context';

interface ProjectPageProps {
  projects: PageItem[];
}

const ProjectPage: React.FC<ProjectPageProps> = ({ projects }) => {
  const [, setCursor] = useContext(CursorContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const transitions = useTransition(activeIndex, {
    key: activeIndex,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 200, friction: 30 }, // Smooth fade transition
  });

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  // Add keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projects.length]);

  return (
    <ProjectProvider projects={projects} activeIndex={activeIndex} goTo={goTo}>
      <div className="nav-projects">
        <div className="project-content">
          <div className="project-nav">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`nav-dot ${i === activeIndex ? 'active' : ''} ${projects[activeIndex]?.bg === 'var(--neutral-white)' ? 'inverse-dot' : ''}`}
                onClick={() => goTo(i)}
                onMouseEnter={() => setCursor({ active: true })}
                onMouseLeave={() => setCursor({ active: false })}
              />
            ))}
          </div>

          {transitions((style, i) => {
            const project = projects[i];
            if (!project) return null;

            const Comp = project.component;
            return (
              <animated.div
                key={project.key ?? i}
                className="project-panel"
                style={{
                  ...style,
                  backgroundColor: project.bg,
                  position: 'absolute',
                  inset: 0,
                  margin: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Comp {...project.props} />
              </animated.div>
            );
          })}
        </div>
      </div>
    </ProjectProvider>
  );
};

export default ProjectPage;

// !=====
// <div className="nav-projects">
{
  /* <div className="project-content">
        {navVisible && (
          <div className="project-nav">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}

        <PageMapping transitions={transitions} items={projects} /> */
}
{
  /* <ProjectPanelRenderer
          projects={projects}
          transitions={transitions}
          onToggleExpand={(expanded) => setNavVisible(expanded)}
        /> */
}
//   </div>
// </div>

// !======!

// import { useState, useRef } from "react";
// import { useTransition } from "@react-spring/web";
// // import ImageSwapSpring from "../../components/image-swap/image-swap";
// // import NodeDescription from "../../components/node-description/node-description";
// import "./project-page.css";
// // import { DilloApp } from "../../sections/project-page/dillo-app/dillo-app";
// // import { MayfestSite } from "../../sections/project-page/mayfest-site/mayfest-site";
// import ProjectPanelRenderer from "../../components/page-mapping/page-mapping";

// export interface ProjectData {
//   type: string; // <-- Add this
//   title: string;
//   job: string;
//   description: string;
//   images: string[];
//   nodes: string[];
//   link: string;
//   bg: string;
// }

// interface ProjectPageProps {
//   projects: ProjectData[];
// }

// const ProjectPage: React.FC<ProjectPageProps> = ({ projects }) => {
//   const [navVisible, setNavVisible] = useState(true);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const prevIndexRef = useRef(0);
//   const direction = activeIndex > prevIndexRef.current ? "down" : "up";

//   const transitions = useTransition(activeIndex, {
//     key: activeIndex,
//     from: {
//       transform:
//         direction === "down" ? "translateY(100%)" : "translateY(-100%)",
//     },
//     enter: {
//       transform: "translateY(0%)",
//     },
//     leave: {
//       transform: direction === "down" ? "translateY(-50%)" : "translateY(50%)",
//     },
//     config: { mass: 2, tension: 240, friction: 40 },
//     onRest: () => {
//       prevIndexRef.current = activeIndex;
//     },
//   });
//   return (
//     <div className="nav-projects">
//       <div className="project-content">
//         {/* Navigation lives here and inherits the background */}
//         {navVisible && (
//           <div className="project-nav">
//             {projects.map((_, index) => (
//               <div
//                 key={index}
//                 className={`nav-dot ${index === activeIndex ? "active" : ""}`}
//                 onClick={() => setActiveIndex(index)}
//               />
//             ))}
//           </div>
//       )}

//          {/* {transitions((style, i) => ( */}
//         <ProjectPanelRenderer
//           projects={projects}
//           transitions={transitions}
//           onToggleExpand={(expanded) => setNavVisible(!expanded ? true : false)}
//         />
//         {/* ))} */}
//       </div>
//     </div>
//   );
// };

// export default ProjectPage;

// !! =============== IGNORE THE REST HERE =============== !!

// import { useState, useRef } from "react";
// import { useTransition, animated } from "@react-spring/web";
// import "./project-page.css";

// interface ProjectData {
//   title: string;
//   description: string;
//   bg: string;
// }

// interface ProjectPageProps {
//   projects: ProjectData[];
// }

// const ProjectPage: React.FC<ProjectPageProps> = ({ projects }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const prevIndexRef = useRef(0);

//   const direction = activeIndex > prevIndexRef.current ? "down" : "up";

//   const transitions = useTransition(activeIndex, {
//     key: activeIndex,
//     from: {
//       transform:
//         direction === "down" ? "translateY(100%)" : "translateY(-100%)",
//     },
//     enter: {
//       transform: "translateY(0%)",
//     },
//     leave: {
//       transform: direction === "down" ? "translateY(-50%)" : "translateY(50%)",
//     },
//     config: { mass: 2, tension: 240, friction: 40 },
//     onRest: () => {
//       prevIndexRef.current = activeIndex;
//     },
//   });

//   return (
//     <div className="nav-projects">
//       <div className="project-nav">
//         {projects.map((_, index) => (
//           <div
//             key={index}
//             className={`nav-dot ${index === activeIndex ? "active" : ""}`}
//             onClick={() => setActiveIndex(index)}
//           />
//         ))}
//       </div>

//       <div className="project-content">
//         {transitions((style, i) => (
//           <>
//             <animated.div
//               key={i}
//               className="project-panel"
//               style={{ ...style, backgroundColor: projects[i].bg }}
//             >
//               <h1>{projects[i].title}</h1>
//               <p>{projects[i].description}</p>
//             </animated.div>
//           </>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectPage;

// ! =====================================

// import { useState, useRef } from "react";
// import { useTransition, animated } from "@react-spring/web";
// import "./project-page.css";

// interface ProjectData {
//   title: string;
//   description: string;
//   bg: string;
// }

// interface ProjectPageProps {
//   projects: ProjectData[];
// }

// const ProjectPage: React.FC<ProjectPageProps> = ({ projects }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const prevIndexRef = useRef(0);

//   const direction = activeIndex > prevIndexRef.current ? "down" : "up";

//   const transitions = useTransition(activeIndex, {
//     key: activeIndex,
//     from: {
//       transform:
//         direction === "down" ? "translateY(100%)" : "translateY(-100%)",
//     },
//     enter: {
//       transform: "translateY(0%)",
//     },
//     leave: {
//       transform: direction === "down" ? "translateY(-50%)" : "translateY(50%)",
//     },
//     config: { mass: 2, tension: 240, friction: 40 },
//     onRest: () => {
//       prevIndexRef.current = activeIndex;
//     },
//   });

//   return (
//     <div className="nav-projects">
//       <div className="project-nav">
//         {projects.map((_, index) => (
//           <div
//             key={index}
//             className={`nav-dot ${index === activeIndex ? "active" : ""}`}
//             onClick={() => setActiveIndex(index)}
//           />
//         ))}
//       </div>

//       <div className="project-content">
//         {transitions((style, i) => (
//           <animated.div
//             key={i}
//             className="project-panel"
//             style={{ ...style, backgroundColor: projects[i].bg }}
//           >
//             <h1>{projects[i].title}</h1>
//             <p>{projects[i].description}</p>
//           </animated.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectPage;
