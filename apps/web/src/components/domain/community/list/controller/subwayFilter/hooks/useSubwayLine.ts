import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useSubwayLine = (isOpen: boolean, onOpen: VoidFunction, onClose: VoidFunction) => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm()

  const [tempSelectedLine, setTempSelectedLine] = useState<number | undefined>(undefined)
  const [isFilterSubmitClicked, setIsFilterSubmitClicked] = useState(false)

  const handleSubwayLineChange = (prevVal?: number, currentVal?: number) => () =>
    prevVal !== currentVal ? setTempSelectedLine(currentVal) : setTempSelectedLine(undefined)

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
    }

    if (!getValues('subwayLineId')) {
      setError('subwayLineId', { message: '호선을 입력해주세요.' })
      setValue('subwayLineId', undefined)
    } else {
      setValue('subwayLineId', getValues('subwayLineId'))
    }

    onClose()
  }, [getValues, isFilterSubmitClicked, onClose, setError, setValue, tempSelectedLine])

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
