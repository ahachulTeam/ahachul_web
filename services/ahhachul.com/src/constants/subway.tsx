/* eslint-disable react/jsx-key */
import * as Icons from '@/assets/icons/subway';
import { SubwayLineFilterOptions, SubwayLineKrType, SubwayLineType } from '@/types';

export const subwayIconMap = new Map<number, React.ReactElement>([
  [1, <Icons.SubwayIcon_1 />],
  [2, <Icons.SubwayIcon_2 />],
  [3, <Icons.SubwayIcon_3 />],
  [4, <Icons.SubwayIcon_4 />],
  [5, <Icons.SubwayIcon_5 />],
  [6, <Icons.SubwayIcon_6 />],
  [7, <Icons.SubwayIcon_7 />],
  [8, <Icons.SubwayIcon_8 />],
  [9, <Icons.SubwayIcon_9 />],
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
} as const;

export const subwayLineFilterOptions = {
  [SubwayLineFilterOptions.ALL_LINES]: '전체 호선 보기',
  [SubwayLineFilterOptions.ONLY_MY_LINE]: '내 호선만 보기',
} as const;
