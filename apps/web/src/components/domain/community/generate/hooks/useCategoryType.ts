import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { CommunityCategoryType, CreateArticleQueryModel } from '@/types/community'

export const useCategoryType = (isOpen: boolean, onOpen: VoidFunction, onClose: VoidFunction) => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useFormContext<CreateArticleQueryModel>()

  const [tempCategoryType, setTempCategoryType] = useState<string | undefined>(undefined)
  const [isFilterSubmitClicked, setIsFilterSubmitClicked] = useState(false)

  const handleCategoryTypeChange = (prevVal?: string, currentVal?: string) => () =>
    prevVal !== currentVal ? setTempCategoryType(currentVal) : setTempCategoryType(undefined)

  const handleFilterSubmit = useCallback(() => {
    clearErrors('categoryType')
    setIsFilterSubmitClicked(true)
  }, [clearErrors])

  const handleOpenFilter = useCallback(() => {
    setIsFilterSubmitClicked(false)
    onOpen()
  }, [onOpen])

  const handleCloseFilter = useCallback(() => {
    if (tempCategoryType && isFilterSubmitClicked) {
      setValue('categoryType', tempCategoryType as CommunityCategoryType)
    }

    if (!getValues('categoryType')) {
      setError('categoryType', { message: '호선을 입력해주세요.' })
      setValue('categoryType', undefined)
    } else {
      setValue('categoryType', getValues('categoryType'))
    }

    onClose()
  }, [getValues, isFilterSubmitClicked, onClose, setError, setValue, tempCategoryType])

  useEffect(() => setTempCategoryType(getValues('categoryType')), [isOpen, getValues])

  return {
    errors,
    control,
    tempCategoryType,
    isFilterSubmitClicked,
    selectedCategoryType: getValues('categoryType'),
    handleCategoryTypeChange,
    handleOpenFilter,
    handleCloseFilter,
    handleFilterSubmit,
  }
}
