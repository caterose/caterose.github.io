import React from 'react';

interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({text}) => {
    return (
        <div className="title">
            {text}
        </div>
    );
}

export default Title