/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react'

import { PATH } from '@/constants'
import { usePushShallowRouter } from '@/hooks'

const useSearchDrawer = (onClose: () => void) => {
  const { router, pushShallowRouter } = usePushShallowRouter()

  const [searchValue, setSearchValue] = useState('')

  const searchValueToEmptyString = useCallback(() => {
    setSearchValue('')
  }, [])

  const closeDrawerAndDeleteSearchValue = () => {
    onClose()
    searchValueToEmptyString()
  }

  const searchSupporting = useCallback(
    (value: string) => {
      onClose()
      setSearchValue('')

      pushShallowRouter(PATH.COMMUNITY, { content: value })
    },
    [router]
  )

  const handleChangeSearchValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }, [])

  const handleSearchHistoryValue = useCallback(
    (value: string) => () => {
      searchSupporting(value)
    },
    []
  )

  const handleHashTagValue = useCallback(
    (value: string) => () => {
      onClose()
      pushShallowRouter(PATH.COMMUNITY, { hashTag: value })
    },
    []
  )

  return {
    searchValue,
    searchSupporting,
    searchValueToEmptyString,
    closeDrawerAndDeleteSearchValue,
    handleChangeSearchValue,
    handleSearchHistoryValue,
    handleHashTagValue,
  }
}

export default useSearchDrawer
