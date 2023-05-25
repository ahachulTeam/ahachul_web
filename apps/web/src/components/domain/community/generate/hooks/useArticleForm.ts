import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PATH } from '@/constants'
import { useToast } from '@/hooks'
import { useCreateArticle } from '@/queries/community/useCreateArticle'
import { CreateArticleQueryModel } from '@/types/community'

export const useArticleForm = () => {
  const router = useRouter()

  const { success } = useToast()

  const { mutate: createArticle } = useCreateArticle()

  const { register, control, handleSubmit } = useForm<CreateArticleQueryModel>()

  const handleCreate = (data: CreateArticleQueryModel) => {
    createArticle(
      {
        title: data.title,
        content: data.content,
        categoryType: data.categoryType,
        subwayLineId: data.subwayLineId,
        // images: imgFiles,
      },
      {
        onSuccess: () => {
          success('글을 생성했다.')
          router.push(`${PATH.COMMUNITY}/?tab=free`, undefined, { shallow: true })
        },
      }
    )
  }

  const handleError = (err: any) => console.error(err)

  const handleClickSubmit = () => handleSubmit(handleCreate, handleError)()

  return { register, control, handleClickSubmit }
}
