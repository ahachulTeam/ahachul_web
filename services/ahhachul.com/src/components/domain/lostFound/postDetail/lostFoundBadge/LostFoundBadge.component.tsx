import { LostFoundType } from '@/types';

interface LostFoundBadgeProps {
  lostFoundType: LostFoundType;
}

const LostFoundBadge = ({ lostFoundType }: LostFoundBadgeProps) => {
  return (
    <div className=" h-7 text-label-small text-gray-0 px-2.5 flex items-center justify-center bg-[#407AD6] rounded-[100px] w-max">
      {lostFoundType === LostFoundType.LOST ? '분실물' : '습득물'}
    </div>
  );
};

export default LostFoundBadge;
