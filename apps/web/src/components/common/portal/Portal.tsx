import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

function Portal({ children }: PropsWithChildren) {
  const container = typeof window !== 'undefined' && document.body

  return container ? createPortal(children, container) : null
}

export default Portal
