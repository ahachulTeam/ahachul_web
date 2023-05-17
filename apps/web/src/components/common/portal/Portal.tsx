import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  containerId: string
  isMounted: boolean
}

function Portal({ children, containerId, isMounted }: PropsWithChildren<PortalProps>) {
  if (isMounted) {
    const portal = document.getElementById(containerId)

    return portal ? createPortal(children, portal) : null
  }

  return null
}

export default Portal
