import { SubwayLineFilterOptions } from '@/types';

export const formatSubwayFilterOption = (
  lineFilter: SubwayLineFilterOptions,
  favoriteLine: number,
) => {
  switch (lineFilter) {
    case SubwayLineFilterOptions.ALL_LINES:
      return 0;
    case SubwayLineFilterOptions.ONLY_MY_LINE:
      return favoriteLine;
  }
};
