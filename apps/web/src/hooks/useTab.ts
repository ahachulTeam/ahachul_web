/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect, useCallback } from 'react'

export default function useTab<T extends string>(tabList: Record<T, string>) {
  const router = useRouter()
  const { query } = router

  const defaultTab = Object.keys(tabList)[0] as T
  const selectedTab = (query?.tab ?? defaultTab) as T

  const handleChangeTab = useCallback(
    (tab: string) => () => {
      const query = { ...router.query }
      router.replace({ pathname: router.pathname, query: { ...query, tab } }, undefined, { shallow: true })
    },
    []
  )

  useEffect(() => {
    if (!selectedTab) {
      return
    }

    const isExistTab = Object.keys(tabList).includes(selectedTab as string)
    if (!isExistTab) {
      router.replace({ pathname: router.pathname, query: { ...query, tab: defaultTab } })
    }
  }, [selectedTab])

  return {
    query,
    selectedTab,
    handleChangeTab,
  }
}
