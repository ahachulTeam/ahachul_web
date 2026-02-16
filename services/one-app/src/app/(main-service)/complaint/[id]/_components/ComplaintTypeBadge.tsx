'use client';

import { ServiceBadge } from '@ahhachul/ui';

import type { ComplaintType } from '@/types/complaint';

const complaintTypeOptions: Record<ComplaintType, string> = {
  ENVIRONMENTAL_COMPLAINT: '환경민원',
  TEMPERATURE_CONTROL: '온도조절',
  DISORDER: '질서저해',
  ANNOUNCEMENT: '안내방송',
  EMERGENCY_PATIENT: '응급환자',
  VIOLENCE: '폭력',
  SEXUAL_HARASSMENT: '성추행',
};

interface Props {
  complaintType: ComplaintType;
}

export const ComplaintTypeBadge = ({ complaintType }: Props) => {
  return (
    <ServiceBadge
      label={complaintTypeOptions[complaintType]}
      className="text-label-small"
      style={{
        minHeight: '28px',
        padding: '0 10px',
      }}
    />
  );
};
