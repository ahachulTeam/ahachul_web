import { useRouter } from 'next/router'

// fixme query type
type UrlQueryType = { [key: string]: string | string[] | undefined }

export const usePushShallowRouter = () => {
  const router = useRouter()

  const pushShallowRouter = (path: string, query?: UrlQueryType) => () =>
    router.push(
      !query
        ? path
        : {
            pathname: path,
            query,
          },
      undefined,
      { shallow: true }
    )

  return { router, pushShallowRouter }
}
