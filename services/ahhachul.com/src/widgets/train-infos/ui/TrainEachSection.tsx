import * as styles from './TrainEachSection.css';

interface TrainEachSectionProps {
  color: string;
  roomNumber: number;
}

export const TrainEachSection = ({
  color,
  roomNumber,
}: TrainEachSectionProps) => (
  <div css={styles.eachSection(color)}>{roomNumber}</div>
);
