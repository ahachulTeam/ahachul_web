import { communityTypeOptions } from '@/constants';
import { CommunityType } from '@/types';

import * as S from './CommunityCategoryBadge.styled';

interface CommunityCategoryBadgeProps {
  categoryType: CommunityType;
}

const CommunityCategoryBadge = ({ categoryType }: CommunityCategoryBadgeProps) => {
  return <S.Badge>{communityTypeOptions[categoryType]}</S.Badge>;
};

export default CommunityCategoryBadge;
