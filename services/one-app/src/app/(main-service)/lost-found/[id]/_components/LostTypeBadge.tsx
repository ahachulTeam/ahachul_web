import { ServiceBadge } from '@ahhachul/ui';

import type { LostFoundType } from '@/types';

interface Props {
  lostFoundType: LostFoundType;
}

export const LostTypeBadge = ({ lostFoundType }: Props) => {
  return (
    <ServiceBadge
      label={lostFoundType === 'LOST' ? '분실물' : '습득물'}
      className="text-label-small"
      style={{
        minHeight: '28px',
        padding: '0 10px',
      }}
    />
  );
};
