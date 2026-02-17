import { ServiceBadge } from '@ahhachul/ui';

import { LostFoundType } from '@/types';

interface LostFoundBadgeProps {
  lostFoundType: LostFoundType;
}

const LostFoundBadge = ({ lostFoundType }: LostFoundBadgeProps) => {
  return <ServiceBadge label={lostFoundType === LostFoundType.LOST ? '분실물' : '습득물'} />;
};

export default LostFoundBadge;
