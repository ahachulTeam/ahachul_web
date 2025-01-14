import { SubwayLineFilterOptions } from '@/model';

export const subwayLineIdOptions = {
  [SubwayLineFilterOptions.ALL_LINES]: '전체 호선 보기',
  [SubwayLineFilterOptions.ONLY_MY_LINE]: '내 호선만 보기',
} as const;
