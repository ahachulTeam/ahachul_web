import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  mounted: boolean;
  elementId?: string;
}

const Portal = ({ children, elementId = 'modal-root', mounted }: PortalProps) => {
  if (mounted) {
    const portal = document.getElementById(elementId);

    return portal ? createPortal(children, portal) : null;
  }

  return null;
};

export default Portal;
