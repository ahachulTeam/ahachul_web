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

export const formatLost112Content = (content: string) => {
  const formattedText = content
    .replace(/하였습니다. /g, '하였습니다.\n\n')
    .replace(/바랍니다. /g, '바랍니다.\n\n');

  return formattedText;
};
