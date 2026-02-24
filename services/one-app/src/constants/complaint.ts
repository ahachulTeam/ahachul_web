import { SubwayLineFilterOptions } from '@/types';
import { type ComplaintType, type ShortComplaintType } from '@/types/complaint';

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

export const complaintShortTypeOptions: Record<
  ComplaintType,
  Partial<Record<ShortComplaintType, string>>
> = {
  ENVIRONMENTAL_COMPLAINT: {
    WASTE: '오물',
    VOMIT: '토사물',
    VENTILATION_REQUEST: '환기요청',
  },
  TEMPERATURE_CONTROL: {
    TOO_HOT: '더워요',
    TOO_COLD: '추워요',
  },
  DISORDER: {
    MOBILE_VENDOR: '이동상인',
    DRUNK: '취객',
    HOMELESS: '노숙',
    BEGGING: '구걸',
    RELIGIOUS_ACTIVITY: '종교행위',
  },
  ANNOUNCEMENT: {
    NOISY: '시끄러워요',
    NOT_HEARD: '안들려요',
  },
  EMERGENCY_PATIENT: {
    SELF: '본인',
    WITNESS: '목격자',
  },
  VIOLENCE: {
    VICTIM: '피해자',
    WITNESS: '목격자',
  },
  SEXUAL_HARASSMENT: {
    VICTIM: '피해자',
    WITNESS: '목격자',
  },
};
