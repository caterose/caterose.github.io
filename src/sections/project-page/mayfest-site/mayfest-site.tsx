import React from "react";
import ImageSwapSpring from "../../../components/image-swap/image-swap";
import NodeDescription from "../../../components/node-description/node-description";
import styles from "./mayfest-site.module.css";
// import  "./dillo-app.css";

interface MayfestSiteProps {
  title: string;
  job: string;
  description: string;
  images: string[];
  nodes: string[];
}

export const MayfestSite: React.FC<MayfestSiteProps> = ({
  title,
  job,
  description,
  images,
  nodes,
}: MayfestSiteProps) => {
  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <ImageSwapSpring image1={images[0]} image2={images[1]} />
      </div>
      <div className={styles.right}>
        <h1 className={`project-title-1 ${styles.projectTitle}`}>{title}</h1>
        <h2 className={`project-subtitle-2 ${styles.jobTitle}`}>{job}</h2>
        <p className={`project-body-1 ${styles.description}`}>{description}</p>
        <h2 className={`project-subtitle-1 ${styles.fastFacts}`}>Fast facts:</h2>
        <div className={styles.factNodes}>
          {
            nodes.map((node, index) => (
              <NodeDescription
                key={index}
                className="project-node"
                text={node}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};




// import React from "react";
// import NodeDescription from "../../../components/node-description/node-description";
// import "./mayfest-site.css";

// interface MayfestSiteProps {
//   title: string;
//   job: string;
//   description: string;
//   images: string;
//   nodes: string[];
// }

// export const MayfestSite: React.FC<MayfestSiteProps> = ({
//   title,
//   job,
//   description,
//   images,
//   nodes,
// }: MayfestSiteProps) => {
//   return (
//     <div className="content">
//       <div className="left">
//         <img
//           src={images[0]}
//           alt="Mayfest site design"
//           className="project-image"
//         />
//       </div>
//       <div className="right">
//         <h1 className="project-title">{title}</h1>
//         <h2 className="job-title">{job}</h2>
//         <p className="description">{description}</p>
//         <h2 className="job-title">Fast facts:</h2>
//         <div className="nodes">
//           {
//             /* Map through nodes to create NodeDescription components */
//             nodes.map((node, index) => (
//               <NodeDescription
//                 key={index}
//                 className="project-node"
//                 text={node}
//               />
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   );
// };
