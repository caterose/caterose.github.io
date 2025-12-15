import React from 'react';
import ImageSwapSpring from '../../../components/image-swap/image-swap';
import NodeDescription from '../../../components/node-description/node-description';
import styles from './history-research.module.css';

interface DilloAppProps {
  title: string;
  // adviser: string;
  timeline: string;
  descriptions: string[];
  image: string;
  links: string[];
}

export const HistoryResearch: React.FC<DilloAppProps> = ({
  title,
  // adviser,
  timeline,
  descriptions,
  image,
  links,
}: DilloAppProps) => {
  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <img src={image} />
        {/* <ImageSwapSpring image1={images[0]} image2={images[1]} /> */}
      </div>
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
        <h2 className={`project-subtitle-1 ${styles.fastFacts}`}>ARTICLES:</h2>
        <div className={styles.linkNodes}>
          {links.map(([title, link], index) => (
            <NodeDescription key={index} className="project-node" text={title} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};
