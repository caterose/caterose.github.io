// PageMapping.tsx
import React from 'react';
import { animated } from '@react-spring/web';

export interface PageItem {
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  bg?: string;
  key?: React.Key;
}

type TransitionsFn = ReturnType<typeof import('@react-spring/web').useTransition>;

interface PageMappingProps {
  transitions: TransitionsFn; // <-- function, not array
  items: PageItem[];
}

const PageMapping: React.FC<PageMappingProps> = ({ transitions, items }) => {
  return transitions((style, i) => {
    const it = items[i];
    if (!it) return null;

    const Comp = it.component;
    return (
      <animated.div
        key={it.key ?? i}
        className="project-panel"
        style={{
          ...style,
          backgroundColor: it.bg,
          position: 'absolute',
          inset: 0,
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          perspective: 1000,
        }}
      >
        <Comp {...it.props} />
      </animated.div>
    );
  });
};

export default PageMapping;

// // PageMapping.tsx
// import React from 'react';
// import { animated } from '@react-spring/web';

// export interface PageItem {
//   component: React.ComponentType<any>;
//   props?: Record<string, any>;
//   bg?: string;
//   key?: React.Key;
// }

// type TObj = {
//   key: React.Key;
//   item: any; // activeIndex
//   styles?: any;
//   style?: any;
//   props?: any;
// };

// interface PageMappingProps {
//   transitions: TObj[]; // <-- array, not function
//   items: PageItem[];
// }

// const PageMapping: React.FC<PageMappingProps> = ({ transitions, items }) => {
//   return (
//     <>
//       {transitions.map((t) => {
//         const i = typeof t.item === 'number' ? t.item : 0;
//         const it = items[i];
//         if (!it) return null;

//         const Comp = it.component;
//         const spring = t.styles ?? t.style ?? t.props ?? {};

//         return (
//           <animated.div
//             key={it.key ?? t.key}
//             className="project-panel"
//             style={{
//               ...spring,
//               backgroundColor: it.bg,
//               position: 'absolute',
//               inset: 0,
//               margin: 'auto',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Comp {...it.props} />
//           </animated.div>
//         );
//       })}
//     </>
//   );
// };

// export default PageMapping;

// // PageMapping.tsx
// import React from 'react';
// import { animated } from '@react-spring/web';
// import type { TransitionFn, Lookup } from '@react-spring/web';

// export interface PageItem {
//   component: React.ComponentType<any>;
//   props?: Record<string, any>;
//   bg?: string;
//   key?: React.Key; // optional stable key
// }

// interface PageMappingProps {
//   transitions: TransitionFn<number, Lookup<any>>;
//   items: PageItem[]; // any components, any props
// }

// const PageMapping: React.FC<PageMappingProps> = ({ transitions, items }) => {
//   return (
//     <>
//       {transitions((style, i) => {
//         const item = items[i];
//         if (!item) return null;

//         const { component: Comp, props, bg } = item;

//         return (
//           <animated.div
//             key={item.key ?? i}
//             className="project-panel"
//             style={{
//               ...style,
//               backgroundColor: bg,
//               position: 'absolute',
//               inset: 0,
//               margin: 'auto',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Comp {...props} />
//           </animated.div>
//         );
//       })}
//     </>
//   );
// };

// export default PageMapping;

// // ! =======================
// // import React, { useState } from 'react';
// // import { animated, useSpring } from '@react-spring/web';
// // import type { TransitionFn, Lookup } from '@react-spring/web';
// // import { DilloApp } from '../../sections/project-page/dillo-app/dillo-app';
// // import { MayfestSite } from '../../sections/project-page/mayfest-site/mayfest-site';
// // import './page-mapping.css';

// // export type ProjectType = 'dillo' | 'mayfest';

// // export interface ProjectData {
// //   type: string;
// //   title: string;
// //   job: string;
// //   description: string;
// //   images: string[];
// //   nodes: string[];
// //   link: string;
// //   bg: string;
// // }

// // // export interface Project {
// // //   type: ProjectType;
// // //   title: string;
// // //   job?: string;
// // //   description?: string;
// // //   images?: string[];
// // //   nodes?: string[];
// // //   bg?: string;
// // // }

// // const componentMap: Record<ProjectType, React.FC<any>> = {
// //   dillo: DilloApp,
// //   mayfest: MayfestSite,
// //   // Add additional mappings here
// // };

// // interface PageMappingProps {
// //   transitions: TransitionFn<number, Lookup<any>>;
// //   pagesProps: Project[];
// //   pages: React.Component;

// //   // onToggleExpand?: (expanded: boolean) => void;
// // }

// // const PageMapping: React.FC<PageMappingProps> = ({
// //   transitions,
// //   pages,
// //   pagesProps,
// //   // onToggleExpand,
// // }) => {
// //   // const [expanded, setExpanded] = useState(false);

// //   // const expandStyles = useSpring({
// //   //   width: expanded ? "100vw" : "70vw",
// //   //   height: expanded ? "100vh" : "70vh",
// //   //   config: { tension: 250, friction: 20 },
// //   // });

// //   // const handleToggle = () => {
// //   //   setExpanded((prev) => {
// //   //     const next = !prev;
// //   //     if (onToggleExpand) onToggleExpand(next);
// //   //     return next;
// //   //   });
// //   // };

// //   return (
// //     <>
// //       {transitions((style, i) => {
// //         const page = pagesProps[i];
// //         const PageComponent = componentMap[pages.type]; // ! FIX THIS

// //         return (
// //           <animated.div
// //             key={i}
// //             className="project-panel"
// //             style={{
// //               ...style,
// //               // ...expandStyles,
// //               backgroundColor: page.bg,
// //               position: 'absolute',
// //               top: 0,
// //               left: 0,
// //               right: 0,
// //               bottom: 0,
// //               margin: 'auto',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //             }}
// //             // onClick={handleToggle}
// //           >
// //             {PageComponent ? (
// //               <PageComponent
// //                 {...page}
// //                 // title={page.title}
// //                 // job={page.job}
// //                 // description={page.description}
// //                 // images={page.images}
// //                 // nodes={page.nodes}
// //               />
// //             ) : (
// //               <div>Component not found for type: {page.type}</div>
// //             )}
// //           </animated.div>
// //         );
// //       })}
// //     </>
// //   );
// // };

// // export default PageMapping;

// // ! ========================================================================
// // // ! prev render

// // import React, { useState } from "react";
// // import { animated, useSpring } from "@react-spring/web";
// // import type { TransitionFn, Lookup } from "@react-spring/web";
// // import { DilloApp } from "../../sections/project-page/dillo-app/dillo-app";
// // import { MayfestSite } from "../../sections/project-page/mayfest-site/mayfest-site";
// // import "./page-mapping.css";

// // export type ProjectType = "dillo" | "mayfest";

// // export interface Project {
// //   type: ProjectType;
// //   title: string;
// //   job?: string;
// //   description?: string;
// //   images?: string[];
// //   nodes?: string[];
// //   bg?: string;
// // }

// // const componentMap: Record<ProjectType, React.FC<any>> = {
// //   dillo: DilloApp,
// //   mayfest: MayfestSite,
// //   // Add additional mappings here
// // };

// // interface ProjectPanelRendererProps {
// //   transitions: TransitionFn<number, Lookup<any>>;
// //   projects: Project[];
// //   onToggleExpand?: (expanded: boolean) => void;
// // }

// // const ProjectPanelRenderer: React.FC<ProjectPanelRendererProps> = ({
// //   transitions,
// //   projects,
// //   onToggleExpand,
// // }) => {
// //   const [expanded, setExpanded] = useState(false);

// //   const expandStyles = useSpring({
// //     width: expanded ? "100vw" : "70vw",
// //     height: expanded ? "100vh" : "70vh",
// //     config: { tension: 250, friction: 20 },
// //   });

// //   const handleToggle = () => {
// //     setExpanded((prev) => {
// //       const next = !prev;
// //       if (onToggleExpand) onToggleExpand(next);
// //       return next;
// //     });
// //   };

// //   return (
// //     <>
// //       {transitions((style, i) => {
// //         const project = projects[i];
// //         const ProjectComponent = componentMap[project.type];

// //         return (
// //           <animated.div
// //             key={i}
// //             className="project-panel"
// //             style={{
// //               ...style,
// //               ...expandStyles,
// //               backgroundColor: project.bg,
// //               position: "absolute",
// //               top: 0,
// //               left: 0,
// //               right: 0,
// //               bottom: 0,
// //               margin: "auto",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //             }}
// //             onClick={handleToggle}
// //           >
// //             {ProjectComponent ? (
// //               <ProjectComponent
// //                 title={project.title}
// //                 job={project.job}
// //                 description={project.description}
// //                 images={project.images}
// //                 nodes={project.nodes}
// //               />
// //             ) : (
// //               <div>Component not found for type: {project.type}</div>
// //             )}
// //           </animated.div>
// //         );
// //       })}
// //     </>
// //   );
// // };

// // export default ProjectPanelRenderer;

// // ! prev render

// // import React, { useState } from "react";
// // import { animated, useSpring } from "@react-spring/web";
// // import type { TransitionFn, Lookup } from "@react-spring/web";
// // import { DilloApp } from "../../sections/project-page/dillo-app/dillo-app";
// // import { MayfestSite } from "../../sections/project-page/mayfest-site/mayfest-site";
// // import "./page-mapping.css";

// // export type ProjectType = "dillo" | "mayfest";

// // export interface Project {
// //   type: ProjectType;
// //   title: string;
// //   job?: string;
// //   description?: string;
// //   images?: string[];
// //   nodes?: string[];
// //   bg?: string;
// // }

// // const componentMap: Record<ProjectType, React.FC<any>> = {
// //   dillo: DilloApp,
// //   mayfest: MayfestSite,
// //   // Add additional mappings here
// // };

// // interface ProjectPanelRendererProps {
// //   transitions: TransitionFn<number, Lookup<any>>;
// //   projects: Project[];
// // }

// // const ProjectPanelRenderer: React.FC<ProjectPanelRendererProps> = ({
// //   transitions,
// //   projects,
// // }) => {
// //   const [expanded, setExpanded] = useState(false);

// //   const expandStyles = useSpring({
// //     width: expanded ? "100vw" : "70vw",
// //     height: expanded ? "100vh" : "70vh",
// //     config: { tension: 250, friction: 20 },
// //   });

// //   return (
// //     <>
// //       {transitions((style, i) => {
// //         const project = projects[i];
// //         const ProjectComponent = componentMap[project.type];

// //         return (
// //           <animated.div
// //             key={i}
// //             className="project-panel"
// //             style={{
// //               ...style,
// //               ...expandStyles,
// //               backgroundColor: project.bg,
// //               position: "absolute",
// //               top: 0,
// //               left: 0,
// //               margin: "auto",
// //             }}
// //             onClick={() => setExpanded((prev) => !prev)}
// //           >
// //             {ProjectComponent ? (
// //               <ProjectComponent
// //                 title={project.title}
// //                 job={project.job}
// //                 description={project.description}
// //                 images={project.images}
// //                 nodes={project.nodes}
// //               />
// //             ) : (
// //               <div>Component not found for type: {project.type}</div>
// //             )}
// //           </animated.div>
// //         );
// //       })}
// //     </>
// //   );
// // };

// // export default ProjectPanelRenderer;

// // ! PREVIOUS RENDERING

// // import React from "react";
// // import { animated } from "@react-spring/web";
// // import type { TransitionFn, Lookup } from "@react-spring/web";
// // import { DilloApp } from "../../sections/project-page/dillo-app/dillo-app";
// // import { MayfestSite } from "../../sections/project-page/mayfest-site/mayfest-site";
// // import "./page-mapping.css";

// // export type ProjectType = "dillo" | "mayfest";

// // export interface Project {
// //   type: ProjectType;
// //   title: string;
// //   job?: string;
// //   description?: string;
// //   images?: string[];
// //   nodes?: string[];
// //   bg?: string;
// // }

// // const componentMap: Record<ProjectType, React.FC<any>> = {
// //   dillo: DilloApp,
// //   mayfest: MayfestSite,
// //   // Add additional mappings here
// // };

// // interface ProjectPanelRendererProps {
// //   transitions: TransitionFn<number, Lookup<any>>;
// //   projects: Project[];
// // }

// // const ProjectPanelRenderer: React.FC<ProjectPanelRendererProps> = ({
// //   transitions,
// //   projects,
// // }) => {
// //   return (
// //     <>
// //       {transitions((style, i) => {
// //         const project = projects[i];
// //         const ProjectComponent = componentMap[project.type];

// //         return (
// //           <animated.div
// //             key={i}
// //             className="project-panel"
// //             style={{ ...style, backgroundColor: project.bg }}
// //           >
// //             {ProjectComponent ? (
// //               <ProjectComponent
// //                 title={project.title}
// //                 job={project.job}
// //                 description={project.description}
// //                 images={project.images}
// //                 nodes={project.nodes}
// //               />
// //             ) : (
// //               <div>Component not found for type: {project.type}</div>
// //             )}
// //           </animated.div>
// //         );
// //       })}
// //     </>
// //   );
// // };

// // export default ProjectPanelRenderer;

// // ! prev render

// // import React, { useState } from "react";
// // import { animated, useSpring } from "@react-spring/web";
// // import type { TransitionFn, Lookup } from "@react-spring/web";
// // import { DilloApp } from "../../sections/project-page/dillo-app/dillo-app";
// // import { MayfestSite } from "../../sections/project-page/mayfest-site/mayfest-site";
// // import "./page-mapping.css";

// // export type ProjectType = "dillo" | "mayfest";

// // export interface Project {
// //   type: ProjectType;
// //   title: string;
// //   job?: string;
// //   description?: string;
// //   images?: string[];
// //   nodes?: string[];
// //   bg?: string;
// // }

// // const componentMap: Record<ProjectType, React.FC<any>> = {
// //   dillo: DilloApp,
// //   mayfest: MayfestSite,
// //   // Add additional mappings here
// // };

// // interface ProjectPanelRendererProps {
// //   transitions: TransitionFn<number, Lookup<any>>;
// //   projects: Project[];
// // }

// // const ProjectPanelRenderer: React.FC<ProjectPanelRendererProps> = ({
// //   transitions,
// //   projects,
// // }) => {
// //   const [expanded, setExpanded] = useState(false);

// //   const expandStyles = useSpring({
// //     width: expanded ? "100vw" : "70vw",
// //     height: expanded ? "100vh" : "70vh",
// //     config: { tension: 250, friction: 20 },
// //   });

// //   return (
// //     <>
// //       {transitions((style, i) => {
// //         const project = projects[i];
// //         const ProjectComponent = componentMap[project.type];

// //         return (
// //           <animated.div
// //             key={i}
// //             className="project-panel"
// //             style={{
// //               ...style,
// //               ...expandStyles,
// //               backgroundColor: project.bg,
// //               position: "absolute",
// //               top: 0,
// //               left: 0,
// //               margin: "auto",
// //             }}
// //             onClick={() => setExpanded((prev) => !prev)}
// //           >
// //             {ProjectComponent ? (
// //               <ProjectComponent
// //                 title={project.title}
// //                 job={project.job}
// //                 description={project.description}
// //                 images={project.images}
// //                 nodes={project.nodes}
// //               />
// //             ) : (
// //               <div>Component not found for type: {project.type}</div>
// //             )}
// //           </animated.div>
// //         );
// //       })}
// //     </>
// //   );
// // };

// // export default ProjectPanelRenderer;

// // ! PREVIOUS RENDERING

// // import React from "react";
// // import { animated } from "@react-spring/web";
// // import type { TransitionFn, Lookup } from "@react-spring/web";
// // import { DilloApp } from "../../sections/project-page/dillo-app/dillo-app";
// // import { MayfestSite } from "../../sections/project-page/mayfest-site/mayfest-site";
// // import "./page-mapping.css";

// // export type ProjectType = "dillo" | "mayfest";

// // export interface Project {
// //   type: ProjectType;
// //   title: string;
// //   job?: string;
// //   description?: string;
// //   images?: string[];
// //   nodes?: string[];
// //   bg?: string;
// // }

// // const componentMap: Record<ProjectType, React.FC<any>> = {
// //   dillo: DilloApp,
// //   mayfest: MayfestSite,
// //   // Add additional mappings here
// // };

// // interface ProjectPanelRendererProps {
// //   transitions: TransitionFn<number, Lookup<any>>;
// //   projects: Project[];
// // }

// // const ProjectPanelRenderer: React.FC<ProjectPanelRendererProps> = ({
// //   transitions,
// //   projects,
// // }) => {
// //   return (
// //     <>
// //       {transitions((style, i) => {
// //         const project = projects[i];
// //         const ProjectComponent = componentMap[project.type];

// //         return (
// //           <animated.div
// //             key={i}
// //             className="project-panel"
// //             style={{ ...style, backgroundColor: project.bg }}
// //           >
// //             {ProjectComponent ? (
// //               <ProjectComponent
// //                 title={project.title}
// //                 job={project.job}
// //                 description={project.description}
// //                 images={project.images}
// //                 nodes={project.nodes}
// //               />
// //             ) : (
// //               <div>Component not found for type: {project.type}</div>
// //             )}
// //           </animated.div>
// //         );
// //       })}
// //     </>
// //   );
// // };

// // export default ProjectPanelRenderer;
