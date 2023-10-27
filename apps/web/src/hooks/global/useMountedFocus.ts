import { useRef, useEffect } from 'react'

export const useMountedFocus = <T>(mounted: T) => {
  const focusElRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (focusElRef?.current && mounted) {
      focusElRef.current.focus()
    }
  }, [focusElRef, mounted])

  return focusElRef
}
