import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CreateArticleQueryModel } from '@/types/community'

export const useSubwayLine = (isOpen: boolean, onOpen: VoidFunction, onClose: VoidFunction) => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<CreateArticleQueryModel>({
    defaultValues: {
      subwayLineId: undefined,
    },
  })

  const [tempSelectedLine, setTempSelectedLine] = useState('')
  const [isFilterSubmitClicked, setIsFilterSubmitClicked] = useState(false)

  const handleSubwayLineChange = (prevVal: string, currentVal: string) => () =>
    prevVal !== currentVal ? setTempSelectedLine(currentVal) : setTempSelectedLine('')

  const handleFilterSubmit = useCallback(() => {
    clearErrors('subwayLineId')
    setIsFilterSubmitClicked(true)
  }, [clearErrors])

  const handleOpenFilter = useCallback(() => {
    setIsFilterSubmitClicked(false)
    onOpen()
  }, [onOpen])

  const handleCloseFilter = useCallback(() => {
    if (tempSelectedLine && isFilterSubmitClicked) {
      setValue('subwayLineId', Number(tempSelectedLine))
    }

    if (!getValues('subwayLineId')) {
      setError('subwayLineId', { message: '호선을 입력해주세요.' })
    } else {
      setValue('subwayLineId', getValues('subwayLineId'))
    }

    onClose()
  }, [getValues, isFilterSubmitClicked, onClose, setError, setValue, tempSelectedLine])

  useEffect(() => setTempSelectedLine(getValues('subwayLineId')?.toString() || ''), [isOpen, getValues])

  return {
    errors,
    control,
    tempSelectedLine,
    isFilterSubmitClicked,
    selectedSubwayLine: getValues('subwayLineId'),
    handleSubwayLineChange,
    handleOpenFilter,
    handleCloseFilter,
    handleFilterSubmit,
  }
}
