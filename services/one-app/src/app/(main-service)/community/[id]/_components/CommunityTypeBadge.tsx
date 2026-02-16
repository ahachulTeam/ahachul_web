'use client';

import { ServiceBadge } from '@ahhachul/ui';

import { CommunityType } from '@/types/community';

interface Props {
  communityType: CommunityType;
}

export const CommunityTypeBadge = ({ communityType }: Props) => {
  const label =
    communityType === CommunityType.FREE
      ? '자유'
      : communityType === CommunityType.HUMOR
        ? '유머'
        : '정보';

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
