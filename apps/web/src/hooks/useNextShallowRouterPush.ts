import { useRouter } from 'next/router'

export const usePushShallowRouter = () => {
  const router = useRouter()

  const pushShallowRouter = (path: string) => () => router.push(path, undefined, { shallow: true })

  return { pushShallowRouter }
}
