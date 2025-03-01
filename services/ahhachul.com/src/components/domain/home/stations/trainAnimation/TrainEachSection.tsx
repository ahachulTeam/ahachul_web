import * as S from './TrainEachSection.styled';

interface TrainEachSectionProps {
  roomNumber: number;
}

export const TrainEachSection = ({ roomNumber }: TrainEachSectionProps) => (
  <div css={S.eachSection}>{roomNumber}</div>
);
