import { useRouter } from 'next/router'
import { useForm, ErrorOption, FieldErrors } from 'react-hook-form'
import { PATH } from '@/constants'
import { useToast } from '@/hooks'
import { useCreateArticle } from '@/queries/community/useCreateArticle'
import { CreateArticleQueryModel } from '@/types/community'

export const useArticleForm = () => {
  const router = useRouter()

  const { success } = useToast()

  const { mutate: createArticle } = useCreateArticle()

  const methods = useForm<CreateArticleQueryModel>({
    defaultValues: {
      title: '',
      content: '',
      images: [],
      hashTags: [],
      subwayLineId: undefined,
      categoryType: 'FREE',
    },
  })

  const handleCreate = (data: CreateArticleQueryModel) => {
    if (!methods.getValues('subwayLineId')) {
      return methods.setError('subwayLineId', { message: '호선을 선택해 주세요.' })
    }

    console.log(data)

    createArticle(
      {
        title: data.title,
        content: data.content,
        categoryType: data.categoryType,
        subwayLineId: data.subwayLineId,
        hashTags: ['여행', '취미'],
        // images: imgFiles,
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
