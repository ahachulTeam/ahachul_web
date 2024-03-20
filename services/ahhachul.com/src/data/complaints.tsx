import React from 'react';

import { KeyOf } from 'types/utility-types';
import SelectButtonImage from 'components/complaints/room/SelectButtonImage';

import 오물 from 'static/img/complaints/오물.png';
import 토사물 from 'static/img/complaints/토사물.png';
import 환기요청 from 'static/img/complaints/환기요청.png';
import 이동상인 from 'static/img/complaints/이동상인.png';
import 취객 from 'static/img/complaints/취객.png';
import 구걸 from 'static/img/complaints/구걸.png';
import 종교행위 from 'static/img/complaints/종교행위.png';
import 노숙 from 'static/img/complaints/노숙.png';
import Icon시끄러워요 from 'static/icons/complaints/Icon시끄러워요';
import Icon잘안들려요 from 'static/icons/complaints/Icon잘안들려요';
import Icon행선 from 'static/icons/complaints/Icon행선';
import Icon임산부 from 'static/icons/complaints/Icon임산부';
import Icon더워요 from 'static/icons/complaints/Icon더워요';
import Icon추워요 from 'static/icons/complaints/Icon추워요';
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

export type COMPLAINTS_ROOM_SERVICE_INFO_TYPES = {
  [key in COMPLAINTS_CONTENTS_TYPES]: {
    title: string;
    subTitle: string;
    selectList: { [key: string]: string };
    iconList?: { [key: string]: React.ReactElement };
    secondarySelectList?: { [key: string]: string };
    activeColor?: {
      [key: string]: {
        backgroundColor: string;
        borderColor: string;
        pointColor: string;
      };
    };
  };
};

export const COMPLAINTS_ROOM_SERVICE_INFO: COMPLAINTS_ROOM_SERVICE_INFO_TYPES = {
  환경민원: {
    title: '민원유형 선택',
    subTitle: '토사물, 오물, 환기\n각종 환경민원',
    selectList: {
      오물: '오물',
      토사물: '토사물',
      환기요청: '환기요청',
    },
    iconList: {
      오물: <SelectButtonImage image={오물} />,
      토사물: <SelectButtonImage image={토사물} />,
      환기요청: <SelectButtonImage image={환기요청} />,
    },
  },
  안내방송: {
    title: '안내방송',
    subTitle: '방송불량, 음량문제',
    selectList: {
      시끄러워요: '시끄러워요/안내방송이 너무 커요',
      '잘 안들려요': '잘 안들려요/안내방송이 잘 안들려요',
    },
    secondarySelectList: {
      '행선 안내방송': '행선 안내방송',
      '임산부 배려석': '임산부 배려석',
    },
    iconList: {
      시끄러워요: <Icon시끄러워요 />,
      '잘 안들려요': <Icon잘안들려요 />,
      '행선 안내방송': <Icon행선 />,
      '임산부 배려석': <Icon임산부 />,
    },
    activeColor: {
      시끄러워요: {
        backgroundColor: 'rgba(250, 105, 0, 0.15)',
        borderColor: 'rgba(250, 105, 0, 0.70)',
        pointColor: '#F77D2D',
      },
      '잘 안들려요': {
        backgroundColor: '#E3EBFB',
        borderColor: '#649CFF',
        pointColor: '#3675E3',
      },
      '행선 안내방송': {
        backgroundColor: 'rgba(46, 228, 119, 0.12)',
        borderColor: 'rgba(46, 228, 119, 0.60)',
        pointColor: '#199249',
      },
      '임산부 배려석': {
        backgroundColor: 'rgba(235, 31, 116, 0.06)',
        borderColor: 'rgba(235, 31, 116, 0.60)',
        pointColor: '#EB1F74',
      },
    },
  },
  온도조절: {
    title: '온도조절',
    subTitle: '너무 덥거나 추울 때',
    selectList: {
      더워요: '오물/온도를 내려주세요',
      추워요: '토사물/온도를 올려주세요',
    },
    iconList: {
      더워요: <Icon더워요 />,
      추워요: <Icon추워요 />,
    },
    activeColor: {
      더워요: {
        backgroundColor: 'rgba(234, 56, 63, 0.14)',
        borderColor: '#FF8489',
        pointColor: '#EA383F',
      },
      추워요: {
        backgroundColor: 'rgba(54, 117, 227, 0.14)',
        borderColor: '#649CFF',
        pointColor: '#3675E3',
      },
    },
  },
  질서저해: {
    title: '민원유형 선택',
    subTitle: '취객, 노숙, 구걸, 소란 열차 내 질서저해',
    selectList: {
      이동상인: '이동상인',
      취객: '취객',
      노숙: '노숙',
      구걸: '구걸',
      종교행위: '종교행위',
    },
    iconList: {
      이동상인: <SelectButtonImage image={이동상인} />,
      취객: <SelectButtonImage image={취객} />,
      노숙: <SelectButtonImage image={노숙} />,
      구걸: <SelectButtonImage image={구걸} />,
      종교행위: <SelectButtonImage image={종교행위} />,
    },
  },
  응급환자: {
    title: '응급환자와 어떤 관계이신가요?',
    subTitle: '열차 내 응급환자\n긴급 신고하기',
    selectList: {
      '환자 본인': '환자 본인',
      '목격자 (제 3자)': '목격자 (제 3자)',
    },
  },
  폭력: {
    title: '폭력',
    subTitle: '열차 내 폭행 (싸움)\n발생시 신고하기',
    selectList: {
      피해자: '피해자',
      '목격자 (제 3자)': '목격자 (제 3자)',
    },
  },
  성추행: {
    title: '성추행',
    subTitle: '열차 내 성추행, 성폭력, 몰래카메라',
    selectList: {
      피해자: '피해자',
      '목격자 (제 3자)': '목격자 (제 3자)',
    },
  },
} as const;
