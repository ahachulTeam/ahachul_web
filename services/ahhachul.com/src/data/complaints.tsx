import React from 'react';

import { KeyOf, ValueOf } from 'types/utility-types';

import Icon환경 from 'static/icons/complaints/Icon환경';
import Icon질서 from 'static/icons/complaints/Icon질서';
import Icon응급 from 'static/icons/complaints/Icon응급';
import Icon폭력 from 'static/icons/complaints/Icon폭력';
import Icon화살표 from 'static/icons/complaints/Icon화살표';

export const COMPLAINTS_CONTENTS = {
  환경민원: {
    label: '환경민원',
    description: '토사물, 오물, 환기',
    icon: <Icon환경 />,
  },
  온도조절: { label: '온도조절', description: '덥거나 추울 때', icon: null },
  질서저해: {
    label: '질서저해',
    description: '취객, 노숙, 구걸 등',
    icon: <Icon질서 />,
  },
  안내방송: { label: '안내방송', description: '방송불량, 음량 조절까지 한 번에', icon: <Icon화살표 /> },
  응급환자: {
    label: '응급환자',
    description: '환자 긴급 신고',
    icon: <Icon응급 />,
  },
  폭력: {
    label: '폭력',
    description: '열차 내 폭행신고',
    icon: <Icon폭력 />,
  },
  성추행: {
    label: '성추행',
    description: '열차 내 성폭력, 몰래카메라',
    icon: <Icon화살표 />,
  },
} as const;

export type COMPLAINTS_CONTENTS_TYPES = KeyOf<typeof COMPLAINTS_CONTENTS>;
export type COMPLAINTS_CONTENTS_VALUE_TYPES = ValueOf<typeof COMPLAINTS_CONTENTS>;

export const COMPLAINTS_ROOM_SERVICE_INFO = {
  환경민원: {
    title: '민원유형 선택',
    selectList: {
      오물: '오물',
      토사물: '토사물',
      환기요청: '환기요청',
    },
  },
  안내방송: {
    title: '안내방송',
    selectList: {
      시끄러워요: '시끄러워요',
      안들려요: '안들려요',
    },
  },
  온도조절: {
    title: '온도조절',
    selectList: {
      더워요: '더워요',
      추워요: '추워요',
    },
  },
  질서저해: {
    title: '민원유형 선택',
    selectList: {
      이동상인: '이동상인',
      취객: '취객',
      노숙: '노숙',
      구걸: '구걸',
      종교행위: '종교행위',
    },
  },
  응급환자: {
    title: '응급환자와 어떤 관계이신가요?',
    selectList: {
      본인: '본인',
      목격자: '목격자',
    },
  },
  폭력: {
    title: '폭력',
    selectList: {
      피해자: '피해자',
      목격자: '목격자',
    },
  },
  성추행: {
    title: '성추행',
    selectList: {
      피해자: '피해자',
      목격자: '목격자',
    },
  },
} as const;
