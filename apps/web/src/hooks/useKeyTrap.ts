import { useCallback, useEffect, RefObject, ForwardedRef } from 'react'

type Listener = (e: KeyboardEvent) => void

export default function useKeyTrap<T extends HTMLElement>(
  ref: RefObject<T> | ForwardedRef<T>,
  handleClose: () => void
) {
  const handleKeyTrap = useCallback(
    (e: KeyboardEvent) => {
      if (typeof ref === 'function' || !ref?.current) {
        return
      }

      const focusableNodeList = Array.from(
        ref.current.querySelectorAll(
          "[href], :not([tabindex='-1'])[tabindex], button:not([disabled]), input:not([disabled]), textarea, select"
        )
      )
      const { shiftKey, target: eventTarget } = e
      const firstFocusableNdoe = focusableNodeList[0] as HTMLElement
      const lastFocusableNode = focusableNodeList.at(-1) as HTMLElement
      const isFirstFocusableNode = Object.is(eventTarget, firstFocusableNdoe)
      const isLastFocusableNode = Object.is(eventTarget, lastFocusableNode)

      if (shiftKey && isFirstFocusableNode) {
        e.preventDefault()
        lastFocusableNode.focus()
      }
      if (!shiftKey && isLastFocusableNode) {
        e.preventDefault()
        firstFocusableNdoe.focus()
      }
    },
    [ref]
  )

  useEffect(() => {
    const keyListenerMap = new Map<string, Listener>([
      ['Escape', handleClose],
      ['Tab', handleKeyTrap],
    ])

    const handleKeyListener = (e: KeyboardEvent) => {
      const listener = keyListenerMap.get(e.key)
      if (listener) {
        listener(e)
      }
    }

    window.addEventListener('keydown', handleKeyListener)

    return () => {
      window.removeEventListener('keydown', handleKeyListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
