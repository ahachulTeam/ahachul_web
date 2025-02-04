export type ObjectQueryParams = Record<string, string | number | boolean>;
export type ObjectKeys<T extends Record<PropertyKey, unknown>> = `${Exclude<keyof T, symbol>}`;

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

export const objectToQueryString = (params: ObjectQueryParams): string => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

export const queryStringToObject = (queryString: string): Record<string, string> => {
  const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;

  if (!query) return {};

  return query.split('&').reduce((params: Record<string, string>, param) => {
    const [key, value] = param.split('=').map(decodeURIComponent);
    if (key) {
      params[key] = value || '';
    }
    return params;
  }, {});
};
