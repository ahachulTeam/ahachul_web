import { useRouter } from 'next/router'
import { useForm, FieldErrors } from 'react-hook-form'
import { PATH } from '@/constants'
import { useToast } from '@/hooks'
import { useCreateArticle } from '@/queries/community/useCreateArticle'
import { Picture } from '@/types'
import { CreateArticleQueryModel } from '@/types/community'

export const useArticleForm = (pictures: Picture[]) => {
  const router = useRouter()

  const { success } = useToast()

  const { mutate: createArticle } = useCreateArticle()

  const methods = useForm<CreateArticleQueryModel>({
    defaultValues: {
      title: '',
      content: '',
      imageFiles: [],
      hashTags: [],
      subwayLineId: undefined,
      categoryType: 'FREE',
    },
  })

  const handleCreate = ({ title, content, categoryType, subwayLineId, hashTags }: CreateArticleQueryModel) => {
    if (!methods.getValues('subwayLineId')) {
      return methods.setError('subwayLineId', { message: '호선을 선택해 주세요.' })
    }

    createArticle(
      {
        title,
        content,
        categoryType: 'FREE',
        subwayLineId,
        hashTags: ['1호선', '빌런'],
        imageFiles: pictures,
      },
      {
        // onSuccess: () => {
        //   success('글을 생성했다.')
        //   router.push(PATH.COMMUNITY, undefined, { shallow: true })
        // },
      }
    )
  }

  const handleError = (err: FieldErrors) => {
    if (!methods.getValues('subwayLineId')) {
      return methods.setError('subwayLineId', { message: '호선을 선택해 주세요.' })
    }

    console.error(err)
  }

  const handleClickSubmit = () => methods.handleSubmit(handleCreate, handleError)()

  return { methods, errors: methods.formState.errors, handleClickSubmit }
}
