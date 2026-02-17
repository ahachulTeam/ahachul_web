import { ServiceBadge } from '@ahhachul/ui';

import { complaintTypeOptions } from '@/constants';
import type { ComplaintType } from '@/types/complaint';

interface ComplaintCategoryBadgeProps {
  complaintType: ComplaintType;
}

const ComplaintCategoryBadge = ({ complaintType }: ComplaintCategoryBadgeProps) => {
  return <ServiceBadge label={complaintTypeOptions[complaintType]} />;
};

export default ComplaintCategoryBadge;
