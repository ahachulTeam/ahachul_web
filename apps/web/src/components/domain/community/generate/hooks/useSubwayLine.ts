import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { CreateArticleQueryModel } from '@/types/community'

export const useSubwayLine = (isOpen: boolean, onOpen: VoidFunction, onClose: VoidFunction) => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useFormContext<CreateArticleQueryModel>()

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
      setValue('subwayLineId', tempSelectedLine)
    } else {
      setValue('subwayLineId', getValues('subwayLineId') ? getValues('subwayLineId') : '')
    }

    onClose()
  }, [getValues, isFilterSubmitClicked, onClose, setValue, tempSelectedLine])

  useEffect(() => setTempSelectedLine(getValues('subwayLineId')), [isOpen, getValues])

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
