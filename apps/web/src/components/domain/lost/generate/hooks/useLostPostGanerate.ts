import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PATH } from '@/constants'
import { useToast } from '@/hooks/global'

export const useLostPostGanerate = () => {
  const router = useRouter()

  const { success } = useToast()

  // const { mutate: createArticle } = useCreateArticle()

  // const methods = useForm<CreateArticleQueryModel>({
  //   mode: 'onBlur',
  //   defaultValues: {
  //     title: '',
  //     content: '',
  //     imageFiles: [],
  //     subwayLineId: 1,
  //     categoryType: 'FREE',
  //   },
  // })

  // const handleCreate = (data: CreateArticleQueryModel) => {
  //   if (!methods.getValues('subwayLineId')) {
  //     return methods.setError('subwayLineId', { message: '호선을 선택해 주세요.' })
  //   }

  //   createArticle(
  //     {
  //       title: data.title,
  //       content: data.content,
  //       categoryType: data.categoryType,
  //       subwayLineId: data.subwayLineId,
  //     },
  //     {
  //       onSuccess: () => {
  //         success('글을 생성했다.')
  //         router.push(PATH.COMMUNITY, undefined, { shallow: true })
  //       },
  //     }
  //   )
  // }

  // const handleError = (err: any) => {
  //   if (!methods.getValues('subwayLineId')) {
  //     return methods.setError('subwayLineId', { message: '호선을 선택해 주세요.' })
  //   }

  //   console.error(err)
  // }

  // const handleClickSubmit = () => methods.handleSubmit(handleCreate, handleError)()

  // return { methods, errors: methods.formState.errors, handleClickSubmit }
}