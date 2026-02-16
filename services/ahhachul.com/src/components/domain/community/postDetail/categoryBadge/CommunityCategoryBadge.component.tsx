import { ServiceBadge } from '@ahhachul/ui';

import { communityTypeOptions } from '@/constants';
import { CommunityType } from '@/types';

interface CommunityCategoryBadgeProps {
  categoryType: CommunityType;
}

const CommunityCategoryBadge = ({ categoryType }: CommunityCategoryBadgeProps) => {
  return <ServiceBadge label={communityTypeOptions[categoryType]} />;
};

export default CommunityCategoryBadge;
