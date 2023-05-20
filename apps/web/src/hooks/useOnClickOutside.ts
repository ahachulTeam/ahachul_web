import { useEffect, RefObject, ForwardedRef } from 'react'

const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T> | ForwardedRef<T>,
  handler: () => void,
  exceptEl?: HTMLElement | null
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (typeof ref === 'function' || typeof ref === null) {
        return
      }
      const el = ref?.current
      const isIncludeEl = !el || el.contains(e?.target as HTMLElement)
      const isIncludeExceptEl = exceptEl && exceptEl?.contains(e?.target as HTMLElement)

      if (isIncludeEl || isIncludeExceptEl) {
        return
      }
      handler()
    }
    window.addEventListener('mousedown', listener)

    return () => {
      window.removeEventListener('mousedown', listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler])
}

export default useOnClickOutside
