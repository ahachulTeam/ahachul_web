import { useEffect, useState } from 'react'

export enum ScrollDirection {
  up = 'up',
  down = 'down',
}

export const useScrollDirection = () => {
  const threshold = 30
  const [direction, setDirection] = useState(ScrollDirection.up)

  useEffect(() => {
    let previousScrollYPosition = window.scrollY

    const scrolledMoreThanThreshold = (currentScrollYPosition: number) =>
      Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold

    const isScrollingUp = (currentScrollYPosition: number) =>
      currentScrollYPosition > previousScrollYPosition &&
      !(previousScrollYPosition > 0 && currentScrollYPosition === 0) &&
      !(currentScrollYPosition > 0 && previousScrollYPosition === 0)

    const updateScrollDirection = () => {
      const currentScrollYPosition = window.scrollY

      if (scrolledMoreThanThreshold(currentScrollYPosition)) {
        const newScrollDirection = isScrollingUp(currentScrollYPosition) ? ScrollDirection.down : ScrollDirection.up
        setDirection(newScrollDirection)
        previousScrollYPosition = currentScrollYPosition > 0 ? currentScrollYPosition : 0
      }
    }

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection)

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { direction, isScrollUp: direction === ScrollDirection.up, isScrollDown: direction === ScrollDirection.down }
}
