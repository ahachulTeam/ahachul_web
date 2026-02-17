/* eslint-disable react/jsx-key */
import { colors } from '@ahhachul/design-system';

import * as Icons from '@/assets/icons/subway';
import {
  CurrentTrainArrivalType,
  SubwayLineFilterOptions,
  type SubwayLineKrType,
  type SubwayLineType,
  type UserStationList,
} from '@/types';

export const subwayIconMap = new Map<number, React.ReactElement>([
  [1, <Icons.SubwayIcon_1 width={18} height={18} />],
  [2, <Icons.SubwayIcon_2 width={18} height={18} />],
  [3, <Icons.SubwayIcon_3 width={18} height={18} />],
  [4, <Icons.SubwayIcon_4 width={18} height={18} />],
  [5, <Icons.SubwayIcon_5 width={18} height={18} />],
  [6, <Icons.SubwayIcon_6 width={18} height={18} />],
  [7, <Icons.SubwayIcon_7 width={18} height={18} />],
  [8, <Icons.SubwayIcon_8 width={18} height={18} />],
  [9, <Icons.SubwayIcon_9 width={18} height={18} />],
  [10, <Icons.GyeonggangSubwayIcon />],
  [11, <Icons.GyeonguiSubwayIcon />],
  [12, <Icons.GyeongchunSubwayIcon />],
  [13, <Icons.AirportSubwayIcon />],
  [15, <Icons.SeohaeSubwayIcon_ />],
  [16, <Icons.SuinBundangSubwayIcon />],
  [18, <Icons.SinBundangSubwayIcon />],
  [20, <Icons.WuiSinseolSubwayIcon />],
]);

export const subwayLineOptions: Record<SubwayLineType, SubwayLineKrType> = {
  '1': '1호선',
  '2': '2호선',
  '3': '3호선',
  '4': '4호선',
  '5': '5호선',
  '6': '6호선',
  '7': '7호선',
  '8': '8호선',
  '9': '9호선',
  '10': '경강선',
  '12': '경춘선',
  '15': '서해선',
  '18': '신분당선',
  '13': '공항철도',
  '16': '수인분당선',
  '11': '경의중앙선',
  '20': '우이신설경전철',
};

export const subwayLineFilterOptions = {
  [SubwayLineFilterOptions.ALL_LINES]: '전체 호선 보기',
  [SubwayLineFilterOptions.ONLY_MY_LINE]: '내 호선만 보기',
} as const;

export const trainArrivalCodeMap: Record<CurrentTrainArrivalType, string> = {
  ENTER: '진입',
  ARRIVE: '도착',
  DEPARTURE: '출발',
  BEFORE_STATION_DEPARTURE: '전역출발',
  BEFORE_STATION_ARRIVE: '전역도착',
  BEFORE_STATION_ENTER: '전역진입',
  RUNNING: '운행중',
} as const;

const subwayLineColorMap: Record<number, string> = {
  1: colors.subway.s1,
  2: colors.subway.s2,
  3: colors.subway.s3,
  4: colors.subway.s4,
  5: colors.subway.s5,
  6: colors.subway.s6,
  7: colors.subway.s7,
  8: colors.subway.s8,
  9: colors.subway.s9,
  10: colors.subway.gyeonggang,
  11: colors.subway.gyeongui,
  12: colors.subway.gyeongchun,
  13: colors.subway.airport,
  14: colors.subway.incheon1,
  15: colors.subway.seohae,
  16: colors.subway.suinBundang,
  18: colors.subway.sinBundang,
  20: colors.subway.wuisinseol,
};

export const subwayLineHexColors = (line: number) => {
  return subwayLineColorMap[line] ?? colors.subway.fallback;
};

export const defaultStationList: UserStationList = [
  {
    label: '회사',
    stationId: 557,
    stationName: '강남',
    subwayLineInfoList: [
      {
        subwayLineId: '2',
        subwayLineName: '2호선',
      },
      {
        subwayLineId: '18',
        subwayLineName: '신분당선',
      },
    ],
  },
];

export const isSubwayNeedAnimation = (currentTrainArrivalCode?: string) =>
  ['ENTER', 'ARRIVE', 'BEFORE_STATION_DEPARTURE'].includes(currentTrainArrivalCode || '');

export const getArrivalStatusText = (
  isError: boolean,
  isServiceTerminated: boolean,
  currentTrainArrivalCode?: CurrentTrainArrivalType,
) => {
  if (isError) {
    return '일시적인 오류가 발생했습니다.';
  }

  if (isServiceTerminated) {
    return '운행이 종료되었습니다.';
  }

  if (currentTrainArrivalCode) {
    return trainArrivalCodeMap[currentTrainArrivalCode] || '';
  }

  return '일시적인 오류가 발생했습니다.';
};
