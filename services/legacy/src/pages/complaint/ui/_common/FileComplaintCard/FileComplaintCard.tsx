import * as styles from './FileComplaintCard.css';

interface FileComplaintCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FileComplaintCard = ({ icon, title, description }: FileComplaintCardProps) => {
  return (
    <article css={styles.wrap}>
      <span>{title}</span>
      <p>{description}</p>
      {icon}
    </article>
  );
};
