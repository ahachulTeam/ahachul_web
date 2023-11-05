import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'


export function Portal({ children }: PropsWithChildren) {
  const container = typeof window !== 'undefined' && document.body

  return container ? createPortal(children, container) : null
}
