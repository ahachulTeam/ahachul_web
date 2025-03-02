import {
  ArrowMiniIcon,
  EmergencyIcon,
  HitIcon,
  MetroIcon,
  TreeIcon,
} from '@/assets/icons/complaint';
import { SubwayLineFilterOptions } from '@/types';
import type { ComplaintType } from '@/types/complaint';

export const complaintsContentList = {
  ENVIRONMENTAL_COMPLAINT: {
    label: '환경민원',
    desc: '토사물, 오물, 환기',
    icon: <TreeIcon />,
  },
  TEMPERATURE_CONTROL: {
    label: '온도조절',
    desc: '덥거나 추울 때',
    icon: null,
  },
  DISORDER: {
    label: '질서저해',
    desc: '취객, 노숙, 구걸 등',
    icon: <MetroIcon />,
  },
  ANNOUNCEMENT: {
    label: '안내방송',
    desc: '방송불량, 음량 조절까지 한 번에',
    icon: <ArrowMiniIcon />,
  },
  EMERGENCY_PATIENT: {
    label: '응급환자',
    desc: '환자 긴급 신고',
    icon: <EmergencyIcon />,
  },
  VIOLENCE: {
    label: '폭력',
    desc: '열차 내 폭행신고',
    icon: <HitIcon />,
  },
  SEXUAL_HARASSMENT: {
    label: '성추행',
    desc: '열차 내 성폭력, 몰래카메라',
    icon: <ArrowMiniIcon />,
  },
};

export const complaintsContentDetail = {
  ENVIRONMENTAL_COMPLAINT: {
    title: '민원유형 선택',
    selectList: {
      WASTE: '오물',
      VOMIT: '토사물',
      VENTILATION_REQUEST: '환기요청',
    },
  },
  TEMPERATURE_CONTROL: {
    title: '온도조절',
    selectList: {
      TOO_HOT: '더워요',
      TOO_COLD: '추워요',
    },
  },
  DISORDER: {
    title: '민원유형 선택',
    selectList: {
      MOBILE_VENDOR: '이동상인',
      DRUNK: '취객',
      HOMELESS: '노숙',
      BEGGING: '구걸',
      RELIGIOUS_ACTIVITY: '종교행위',
    },
  },
  ANNOUNCEMENT: {
    title: '안내방송',
    selectList: {
      NOISY: '시끄러워요',
      NOT_HEARD: '안들려요',
    },
  },
  EMERGENCY_PATIENT: {
    title: '응급환자와 어떤 관계이신가요?',
    selectList: {
      SELF: '본인',
      WITNESS: '목격자',
    },
  },
  VIOLENCE: {
    title: '폭력',
    selectList: {
      VICTIM: '피해자',
      WITNESS: '목격자',
    },
  },
  SEXUAL_HARASSMENT: {
    title: '성추행',
    selectList: {
      VICTIM: '피해자',
      WITNESS: '목격자',
    },
  },
} as const;

export const compalintFilterKeys = {
  subwayLineId: 'subwayLineId',
} as const;

export const defaultComplaintFilterValues = {
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
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

export const getSubwayComplaintCallNumber = (subwayLineId: number) => {
  if (subwayLineId === 9) {
    return '1544-4009';
  }

  if (subwayLineId === 18) {
    return '031-8018-7777';
  }

  if (subwayLineId === 13 || subwayLineId === 11 || subwayLineId === 16) {
    return '1544-7769';
  }

  return '1577-1234';
};
