import React from 'react';
import './node-description.css';

interface NodeDescProps {
    className: string;
    text: string;
}

const NodeDescription: React.FC<NodeDescProps> = ({className, text} : NodeDescProps) => {
    return (
        <div className={className}>
            {text}
        </div>
    );
}

export default NodeDescription;