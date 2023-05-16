import type { ReadonlyURLSearchParams } from "next/navigation";

export const createHref = (pathname: string, searchParams: string) => `${pathname}?${searchParams}`;

export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  { key, value }: { key: string; value: string }
): string => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);

  return params.toString();
};

export const deleteQueryString = (
  searchParams: ReadonlyURLSearchParams,
  ...queryKeys: string[]
): string => {
  const params = new URLSearchParams(searchParams);
  queryKeys.forEach(key => {
    params.delete(key);
  });
  return params.toString();
};
