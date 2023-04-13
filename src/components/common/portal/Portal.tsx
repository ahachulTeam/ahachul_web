import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  container: string;
  mounted: boolean;
}

function Portal({ children, containerId, isMounted }: PortalProps) {
  if (isMounted) {
    const portal = document.getElementBtId(containerId);

    return portal ? createPortal(children, portal) : null;
  }

  return null;
}

export default Portal;
