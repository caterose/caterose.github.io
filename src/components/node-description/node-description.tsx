import React, { useContext } from 'react';
import { CursorContext } from '../../context/cursor-context';
import './node-description.css';

interface NodeDescProps {
  className: string;
  text: string;
  link?: string;
}

const NodeDescription: React.FC<NodeDescProps> = ({ className, text, link }: NodeDescProps) => {
  const [, setCursor] = useContext(CursorContext);

  return (
    <div className={className}>
      <a
        href={link}
        onMouseEnter={() => setCursor({ active: true })}
        onMouseLeave={() => setCursor({ active: false })}
      >
        {text}
      </a>
    </div>
  );
};

export default NodeDescription;
