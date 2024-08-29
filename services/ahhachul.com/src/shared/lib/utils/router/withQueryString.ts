import { getQueryParams, type QueryString } from './getQueryParams';

export function withQueryString(url: string, params?: QueryString) {
  const queryString = getQueryParams(params);
  if (!queryString) return url;
  return `${url}?${queryString}`;
}
