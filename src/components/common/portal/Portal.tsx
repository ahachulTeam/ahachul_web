import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  containerId: string;
  isMounted: boolean;
}

function Portal({ children, containerId, isMounted }: PortalProps) {
  if (isMounted) {
    const portal = document.getElementById(containerId);

    return portal ? createPortal(children, portal) : null;
  }

  return null;
}

export default Portal;
