import queryString from 'query-string';

import type { ObjectKeys } from '@/model';

export const isValidObject = (obj: unknown): obj is Record<string, any> => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
};

export function removeFalsyValues<T extends Record<string, any>>(
  obj: T,
  options: { removeEmptyStrings?: boolean; removeZero?: boolean } = {},
): Partial<T> {
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
}

export const objectToQueryString = <T extends Record<string, any>>(
  params: T,
  options?: { removeEmptyStrings?: boolean; removeZero?: boolean },
): string => {
  if (!isValidObject(params)) {
    throw new Error('params must be a non-null object');
  }

  return queryString.stringify(removeFalsyValues(params, options));
};

export function objectEntries<Type extends Record<PropertyKey, unknown>>(
  obj: Type,
): Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]> {
<<<<<<< HEAD
  return Object.entries(obj) as Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]>;
=======
  return Object.entries(obj) as Array<
    [ObjectKeys<Type>, Type[ObjectKeys<Type>]]
  >;
>>>>>>> main
}
