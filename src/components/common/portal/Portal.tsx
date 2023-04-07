import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  container: string;
  mounted: boolean;
}

function Portal({ children, container, mounted }: PortalProps) {
  if (mounted) {
    const portal = document.querySelector(container);

    return portal ? createPortal(children, portal) : null;
  }

  return null;
}

export default Portal;
