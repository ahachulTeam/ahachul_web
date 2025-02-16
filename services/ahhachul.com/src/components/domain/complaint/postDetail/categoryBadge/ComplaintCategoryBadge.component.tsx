import { complaintTypeOptions } from '@/constants';
import type { ComplaintType } from '@/types/complaint';

import * as S from './ComplaintCategoryBadge.styled';

interface ComplaintCategoryBadgeProps {
  complaintType: ComplaintType;
}

const ComplaintCategoryBadge = ({ complaintType }: ComplaintCategoryBadgeProps) => {
  return <S.Badge>{complaintTypeOptions[complaintType]}</S.Badge>;
};

export default ComplaintCategoryBadge;
