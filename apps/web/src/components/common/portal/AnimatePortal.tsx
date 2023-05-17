import { AnimatePresence } from 'framer-motion'
import { PropsWithChildren, type ComponentProps } from 'react'
import { createPortal } from 'react-dom'

interface Props extends ComponentProps<typeof Portal> {
  isMounted: boolean
  mode?: ComponentProps<typeof AnimatePresence>['mode']
}

function Portal({ children }: PropsWithChildren) {
  const container = typeof window !== 'undefined' && document.body

  return container ? createPortal(children, container) : null
}

function AnimatePortal({ children, isMounted, mode = 'wait' }: Props) {
  return (
    <Portal>
      <AnimatePresence mode={mode}>{isMounted && children}</AnimatePresence>
    </Portal>
  )
}

export default AnimatePortal
