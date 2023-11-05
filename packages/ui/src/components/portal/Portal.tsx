import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalPrpps {
  children: ReactNode
}

export function Portal({ children }: PortalPrpps) {
  const container = typeof window !== 'undefined' && document.body

  return container ? createPortal(children, container) : null
}
