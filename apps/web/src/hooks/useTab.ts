/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect, useCallback } from 'react'

const useTab = (tabList: { [key: string]: string }) => {
  const router = useRouter()
  const { query } = router

  const defaultTab = Object.keys(tabList)[0]
  const selectedTab = query?.tab ?? defaultTab

  const handleChangeTab = useCallback(
    (tab: string) => () => {
      const query = { ...router.query }
      router.push({ pathname: router.pathname, query: { ...query, tab } }, undefined, { shallow: true })
    },
    []
  )

  useEffect(() => {
    if (!selectedTab) {
      return
    }

    const isExistTab = Object.keys(tabList).includes(selectedTab as string)
    if (!isExistTab) {
      router.push({ pathname: router.pathname, query: { ...query, tab: defaultTab } })
    }
  }, [selectedTab])

  return {
    query,
    selectedTab,
    handleChangeTab,
  }
}

export default useTab
