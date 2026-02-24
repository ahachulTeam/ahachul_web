import { SubwayLineFilterOptions } from '@/types';
import { type ComplaintType } from '@/types/complaint';

export const defaultComplaintFilterValues = {
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
  stationId: '0',
} as const;

export const complaintTypeOptions: Record<ComplaintType, string> = {
  ENVIRONMENTAL_COMPLAINT: '환경민원',
  TEMPERATURE_CONTROL: '온도조절',
  DISORDER: '질서저해',
  ANNOUNCEMENT: '안내방송',
  EMERGENCY_PATIENT: '응급환자',
  VIOLENCE: '폭력',
  SEXUAL_HARASSMENT: '성추행',
};
