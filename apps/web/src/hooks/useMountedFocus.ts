import { useRef, useEffect } from 'react'

export default function useMountedFocus<T>(mounted: T) {
  const focusElRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (focusElRef?.current && mounted) {
      focusElRef.current.focus()
    }
  }, [focusElRef, mounted])

  return focusElRef
}
