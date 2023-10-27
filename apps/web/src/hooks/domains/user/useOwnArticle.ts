import { useAuth } from '@/context'

export const useOwnArticle = (createdBy?: string) => {
  const { user } = useAuth()

  return user?.email === createdBy
}
