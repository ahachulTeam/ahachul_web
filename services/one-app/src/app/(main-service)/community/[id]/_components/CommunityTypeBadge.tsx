'use client';

import { ServiceBadge } from '@ahhachul/ui';

import { CommunityType } from '@/types/community';

interface Props {
  communityType: CommunityType;
}

export const CommunityTypeBadge = ({ communityType }: Props) => {
  let label = '정보';
  if (communityType === CommunityType.FREE) {
    label = '자유';
  } else if (communityType === CommunityType.HUMOR) {
    label = '유머';
  }

  return (
    <ServiceBadge
      label={label}
      className="text-label-small"
      style={{
        minHeight: '28px',
        padding: '0 10px',
      }}
    />
  );
};
