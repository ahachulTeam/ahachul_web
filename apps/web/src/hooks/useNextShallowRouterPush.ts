import { useRouter } from 'next/router'
import { UrlQueryType } from '@/types/common'

export const usePushShallowRouter = () => {
  const router = useRouter()

  const pushShallowRouter = (pathname: string, query: UrlQueryType = {}) =>
    router.push({ pathname, query }, undefined, { shallow: true })

  return { router, pushShallowRouter }
}
