import { useForm, FieldErrors } from 'react-hook-form'
import { useCreateArticle } from '@/queries/community/useCreateArticle'
import { Picture } from '@/types'
import { CreateArticleQueryModel } from '@/types/community'

export const useArticleForm = (pictures: Picture[]) => {
  const { mutate: createArticle } = useCreateArticle()

  const methods = useForm<CreateArticleQueryModel>({
    defaultValues: {
      title: '',
      content: '',
      imageFiles: [],
      hashTags: [],
      subwayLineId: undefined,
      categoryType: undefined,
    },
  })

  const handleCreate = ({ title, content, categoryType, subwayLineId, hashTags }: CreateArticleQueryModel) => {
    if (!methods.getValues('subwayLineId')) {
      return methods.setError('subwayLineId', { message: '호선을 선택해 주세요.' })
    }

    createArticle({
      title,
      content,
      categoryType,
      subwayLineId,
      hashTags: ['1호선', '빌런'],
      imageFiles: pictures,
    })
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
