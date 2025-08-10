import React from 'react';

interface ResumeProps {
    test: "Resume Page"
}

const ResumePage: React.FC<ResumeProps> = ({test}:ResumeProps) => {
    return (
<div>{test}</div>
    );
}

export default ResumePage;