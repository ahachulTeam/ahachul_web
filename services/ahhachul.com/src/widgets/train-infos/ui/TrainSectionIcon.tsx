import * as styles from './TrainSectionIcon.css';

interface TrainSectionIconProps {
  color: string;
  roomNumber: number;
}

export const TrainSectionIcon = ({
  color,
  roomNumber,
}: TrainSectionIconProps) => (
  <div css={styles.eachSection(color)}>{roomNumber}</div>
);
