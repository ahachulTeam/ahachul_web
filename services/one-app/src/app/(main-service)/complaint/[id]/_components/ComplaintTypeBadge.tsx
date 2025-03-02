'use client';

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
    <div className=" h-7 text-label-small text-gray-0 px-2.5 flex items-center justify-center bg-[#407AD6] rounded-[100px] w-max">
      {complaintTypeOptions[complaintType]}
    </div>
  );
};
