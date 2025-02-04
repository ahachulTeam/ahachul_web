'use client';

import { CommunityType } from '@/types/community';

interface Props {
  communityType: CommunityType;
}

export const CommunityTypeBadge = ({ communityType }: Props) => {
  return (
    <div className=" h-7 text-label-small text-gray-0 px-2.5 flex items-center justify-center bg-[#407AD6] rounded-[100px] w-max">
      {communityType === CommunityType.FREE
        ? '자유'
        : communityType === CommunityType.HUMOR
          ? '유머'
          : '정보'}
    </div>
  );
};
