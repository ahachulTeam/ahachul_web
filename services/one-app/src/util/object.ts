import type { ObjectKeys } from '@/types';

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

export function objectEntries<Type extends Record<PropertyKey, unknown>>(
  obj: Type,
): Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]> {
  return Object.entries(obj) as Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]>;
}
