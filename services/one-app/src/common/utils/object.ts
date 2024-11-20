import queryString from 'query-string';

export const isValidObject = (obj: unknown): obj is Record<string, any> => {
  return typeof obj === 'object' && obj !== null;
};

export function removeFalsyValues<T extends Record<string, any>>(
  obj: T,
  options: { removeEmptyStrings?: boolean; removeZero?: boolean } = {},
): Partial<T> {
  if (!isValidObject(obj)) {
    return obj;
  }

  const result: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (
        value !== undefined &&
        value !== null &&
        (options.removeZero ? value !== 0 : true) &&
        (options.removeEmptyStrings ? value !== '' : true)
      ) {
        result[key] = value;
      }
    }
  }

  return result;
}

export const objectToQueryString = <T extends Record<string, any>>(
  params: T,
  options?: { removeEmptyStrings?: boolean; removeZero?: boolean },
): string => {
  if (!isValidObject(params)) {
    return '';
  }

  return queryString.stringify(removeFalsyValues(params, options));
};
