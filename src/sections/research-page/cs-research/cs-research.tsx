import React from 'react';
import ImageSwapSpring from '../../../components/image-swap/image-swap';
import NodeDescription from '../../../components/node-description/node-description';
import styles from './cs-research.module.css';

interface DilloAppProps {
  title: string;
  // adviser: string;
  timeline: string;
  descriptions: string[];
  // image: string;
  // links: string[];
  nodes: string[];
}

export const CSResearch: React.FC<DilloAppProps> = ({
  title,
  // adviser,
  timeline,
  descriptions,
  nodes,
  // image,
  // links,
}: DilloAppProps) => {
  return (
    <div className={styles.content}>
      {/* <div className={styles.left}>
        <img src={image} />
      </div> */}
      <div className={styles.right}>
        <div className={styles.titleDiv}>
          <h1 className={`project-title-1 ${styles.projectTitle}`}>{title}</h1>
          <h2 className={`project-subtitle-2 ${styles.jobTitle}`}>{timeline}</h2>
        </div>
        <div className={styles.descriptions}>
          {descriptions.map((description, index) => (
            <div key={index}>{description}</div>
          ))}
        </div>
        {/* <p className={`project-body-1 ${styles.description}`}>{description}</p> */}
        <h2 className={`project-subtitle-1 ${styles.fastFacts}`}>SKILLS:</h2>
        <div className={styles.skillNodes}>
          {nodes.map((node, index) => (
            <NodeDescription key={index} className="project-node" text={node} />
          ))}
        </div>
      </div>
    </div>
  );
};
