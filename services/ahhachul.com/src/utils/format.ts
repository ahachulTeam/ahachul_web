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
