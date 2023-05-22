export const createHref = (pathname: string, searchParams: string) => `${pathname}?${searchParams}`

export const createQueryString = (
  searchParams: URLSearchParams,
  { key, value }: { key: string; value: string }
): string => {
  const params = new URLSearchParams(searchParams)
  params.set(key, value)

  return params.toString()
}

export const deleteQueryString = (searchParams: URLSearchParams, ...queryKeys: string[]): string => {
  const params = new URLSearchParams(searchParams)
  queryKeys.forEach(key => {
    params.delete(key)
  })
  return params.toString()
}

export const getOneDepthPath = (path = ''): string => {
  const p = path?.split('/').filter(Boolean)[0] ?? ''
  return `/${p}`
}

export const isMatchRoute = (comparePath: string, path = ''): boolean =>
  getOneDepthPath(comparePath) === getOneDepthPath(path)
