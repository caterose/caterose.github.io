import React from 'react';
import { ContactStandard } from '../../sections/contact-page/contact-standard/contact-standard';

const ContactPage: React.FC = () => {
  return (
    <ContactStandard
      title="CONTACT."
      description="Feel free to reach out if you'd like to collaborate, discuss opportunities, or just say hello!"
      email="cate.c.rose@gmail.com"
      linkedin="https://www.linkedin.com/in/catherine-rose-90aa6b260/"
      otherLinks={[{ label: 'Portfolio', url: 'https://yourportfolio.com' }]}
      nodes={['Available for freelance', 'Open to opportunities', 'Always learning']}
    />
  );
};

export default ContactPage;
