import { useMutation } from '@tanstack/react-query'
import communityApi from '@/apis/community'
import { CreateArticleQueryModel } from '@/types/community'

export const useCreateArticle = () =>
  useMutation({
    mutationFn: (req: CreateArticleQueryModel) => communityApi.createArticle(req),
  })
