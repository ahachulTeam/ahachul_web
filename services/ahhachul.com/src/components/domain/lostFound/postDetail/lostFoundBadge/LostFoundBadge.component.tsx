import { LostFoundType } from '@/types';

import * as S from './LostFoundBadge.styled';

interface LostFoundBadgeProps {
  lostFoundType: LostFoundType;
}

const LostFoundBadge = ({ lostFoundType }: LostFoundBadgeProps) => {
  return <S.Badge>{lostFoundType === LostFoundType.LOST ? '분실물' : '습득물'}</S.Badge>;
};

export default LostFoundBadge;
