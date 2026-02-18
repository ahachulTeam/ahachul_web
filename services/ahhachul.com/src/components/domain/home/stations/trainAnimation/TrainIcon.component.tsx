import { TrainBodyIcon } from '@/assets/icons/system';

interface TrainIconProps {
  width: number;
}

export const TrainIcon = ({ width }: TrainIconProps) => {
  return <TrainBodyIcon width={width} height={31} />;
};
