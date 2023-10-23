import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { communityKeys } from './keys'
import communityAPI from '@/apis/community'
import { PATH } from '@/constants'
import { useToast } from '@/hooks'
import { CreateArticleQueryModel } from '@/types/community'

export const useCreateArticle = () => {
  const router = useRouter()

  const { success } = useToast()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: CreateArticleQueryModel) => communityAPI.createArticle(req),
    onSuccess: () => {
      success('글을 생성했다.')
      queryClient.invalidateQueries(communityKeys.lists())
      router.push(PATH.COMMUNITY, undefined, { shallow: true })
    },
  })
}
