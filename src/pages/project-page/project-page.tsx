import { useState, useRef, useEffect } from 'react';
// import { useTransition } from '@react-spring/web';
// import type { ProjectData } from '../../components/page-mapping/page-mapping';
import { useIndexTransition } from '../../hooks/use-index-transition';
import './project-page.css';
import PageMapping from '../../components/page-mapping/page-mapping';
import type { PageItem } from '../../components/page-mapping/page-mapping';

// export interface ProjectData {
//   type: string;
//   title: string;
//   job: string;
//   description: string;
//   images: string[];
//   nodes: string[];
//   link: string;
//   bg: string;
// }

interface ProjectPageProps {
  projects: PageItem[];
  // projects: ProjectData[];
}

const ProjectPage: React.FC<ProjectPageProps> = ({ projects }) => {
  const { transitions, activeIndex, goTo } = useIndexTransition(projects.length);
  // const [navVisible, setNavVisible] = useState(true);
  // const [activeIndex, setActiveIndex] = useState(0);
  // const prevIndexRef = useRef(0);
  // const direction = activeIndex > prevIndexRef.current ? 'down' : 'up';

  // const transitions = useTransition(activeIndex, {
  //   key: activeIndex,
  //   from: {
  //     transform: direction === 'down' ? 'translateY(100%)' : 'translateY(-100%)',
  //   },
  //   enter: { transform: 'translateY(0%)' },
  //   leave: {
  //     transform: direction === 'down' ? 'translateY(-50%)' : 'translateY(50%)',
  //   },
  //   config: { mass: 2, tension: 240, friction: 40 },
  //   onRest: () => {
  //     prevIndexRef.current = activeIndex;
  //   },
  // });

  // // 🔑 Add keyboard arrow navigation
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === 'ArrowDown') {
  //       setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : prev));
  //     } else if (e.key === 'ArrowUp') {
  //       setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => window.removeEventListener('keydown', handleKeyDown);
  // }, [projects.length]);

  return (
    <div className="nav-projects">
      <div className="project-content">
        <div className="project-nav">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`nav-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <PageMapping transitions={transitions} items={projects} />
      </div>
    </div>
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
