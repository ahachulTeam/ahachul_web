import { formatSubwayFilterOption as formatSubwayFilterOptionShared } from '@ahhachul/utils';

import { SubwayLineFilterOptions } from '@/types';

export const formatSubwayFilterOption = (
  lineFilter: SubwayLineFilterOptions,
  favoriteLine: number,
) => {
  const formatted = formatSubwayFilterOptionShared(lineFilter, favoriteLine, {
    allLinesOption: SubwayLineFilterOptions.ALL_LINES,
    onlyMyLineOption: SubwayLineFilterOptions.ONLY_MY_LINE,
    allLinesValue: 0,
  });

  if (typeof formatted === 'number') {
    return formatted;
  }

  return undefined;
};
