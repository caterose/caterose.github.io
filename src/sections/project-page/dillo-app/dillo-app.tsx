import React from "react";
import ImageSwapSpring from "../../../components/image-swap/image-swap";
import NodeDescription from "../../../components/node-description/node-description";
import styles from "./dillo-app.module.css";

interface DilloAppProps {
  title: string;
  job: string;
  description: string;
  images: string[];
  nodes: string[];
}

export const DilloApp: React.FC<DilloAppProps> = ({
  title,
  job,
  description,
  images,
  nodes,
}: DilloAppProps) => {
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


