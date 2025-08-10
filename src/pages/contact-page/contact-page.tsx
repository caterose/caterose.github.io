import React from 'react';

interface ContactProps {
    test: "Contact Page"
}

const ContactPage: React.FC<ContactProps> = ({test}:ContactProps) => {
    return (
<div>{test}</div>
    );
}

export default ContactPage;