import { useEffect, useRef, useState } from 'react'

export const useLazyLoading = <T extends HTMLImageElement>(threshold = 0) => {
  const targetRef = useRef<T>(null)
  const observerRef = useRef<IntersectionObserver>()
  const [isLoaded, setIsLoaded] = useState(false)

  const intersectionCallBack = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach(
      entry => {
        if (entry.isIntersecting) {
          io.unobserve(entry.target)
          setIsLoaded(true)
        }
      },
      {
        rootMargin: '-20% 0px',
        threshold: 0,
      }
    )
  }

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(intersectionCallBack, {
        threshold,
      })
    }

    targetRef.current && observerRef.current.observe(targetRef.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [threshold])

  return { isLoaded, targetRef }
}
