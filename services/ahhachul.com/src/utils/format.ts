import { SubwayLineFilterOptions } from '@/types';

import { isValidObject } from './common';

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

export const deleteObjectKeyWithEmptyValue = <T extends Record<string, any>>(
  obj: T,
  options: { removeEmptyStrings?: boolean; removeZero?: boolean } = {},
): Partial<T> => {
  if (!isValidObject(obj)) {
    throw new Error('obj must be a non-null object');
  }

  return Object.entries(obj).reduce((result, [key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      (options.removeZero ? value !== 0 : true) &&
      (options.removeEmptyStrings ? value !== '' : true)
    ) {
      result[key as keyof T] = value;
    }
    return result;
  }, {} as Partial<T>);
};

export const formatLost112Content = (content: string) => {
  const formattedText = content
    .replace(/하였습니다. /g, '하였습니다.\n\n')
    .replace(/바랍니다. /g, '바랍니다.\n\n');

  return formattedText;
};
