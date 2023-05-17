/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useState, useCallback } from 'react'

import { PATH } from '@/constants'

const useSearchDrawer = (onClose: () => void) => {
  const router = useRouter()

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

      router.push({
        pathname: PATH.COMMUNITY,
        query: { title: value },
      })
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

  return {
    searchValue,
    searchSupporting,
    searchValueToEmptyString,
    closeDrawerAndDeleteSearchValue,
    handleChangeSearchValue,
    handleSearchHistoryValue,
  }
}

export default useSearchDrawer
