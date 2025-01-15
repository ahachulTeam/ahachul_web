import { useState, useEffect, useCallback } from 'react'

export const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState<Record<string, string>>({})

  const parseQueryParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    const parsedParams: Record<string, string> = {}
    params.forEach((value, key) => {
      parsedParams[key] = value
    })
    setQueryParams(parsedParams)
  }, [])

  useEffect(() => {
    parseQueryParams()

    const handlePopState = () => {
      parseQueryParams()
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [parseQueryParams])

  const getQueryParam = useCallback(
    (key: string): string | null => {
      return queryParams[key] || null
    },
    [queryParams],
  )

  const setQueryParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(window.location.search)
      params.set(key, value)
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
      parseQueryParams()
    },
    [parseQueryParams],
  )

  const removeQueryParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(window.location.search)
      params.delete(key)
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
      parseQueryParams()
    },
    [parseQueryParams],
  )

  return {
    queryParams,
    getQueryParam,
    setQueryParam,
    removeQueryParam,
  }
}
