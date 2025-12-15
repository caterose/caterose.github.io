import { useContext } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { CursorContext } from '../../../context/cursor-context';
import styles from './contact-standard.module.css';

interface ContactStandardProps {
  title: string;
  subtitle?: string;
  description?: string;
  email?: string;
  linkedin?: string;
  otherLinks?: Array<{ label: string; url: string }>;
  nodes?: string[];
}

export const ContactStandard: React.FC<ContactStandardProps> = ({
  title,
  description,
  email,
  linkedin,
  nodes,
}: ContactStandardProps) => {
  const [, setCursor] = useContext(CursorContext);

  return (
    <div className={styles.content}>
      <div className={styles.titleContainer}>
        <h1 className={`project-title-1 ${styles.projectTitle}`}>{title}</h1>
        {description && <p className={`project-body-1 ${styles.description}`}>{description}</p>}
      </div>

      <div className={styles.contactLinks}>
        {email && (
          <a
            href={`mailto:${email}`}
            className={styles.contactLink}
            onMouseEnter={() => setCursor({ active: true })}
            onMouseLeave={() => setCursor({ active: false })}
          >
            <EmailIcon className={styles.contactIcon} />
            <span>{email}</span>
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
            onMouseEnter={() => setCursor({ active: true })}
            onMouseLeave={() => setCursor({ active: false })}
          >
            <LinkedInIcon className={styles.contactIcon} />
            <span>LinkedIn</span>
            {/* <OpenInNewIcon className={styles.externalIcon} /> */}
          </a>
        )}
      </div>

      {nodes && nodes.length > 0 && (
        <div className={styles.factNodes}>
          {nodes.map((node, index) => (
            <span key={index} className={styles.projectNode}>
              {node}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
