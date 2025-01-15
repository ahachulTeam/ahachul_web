import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  elementId: string;
  mounted: boolean;
}

const Portal = ({ children, elementId, mounted }: PortalProps) => {
  if (mounted) {
    const portal = document.getElementById(elementId);

    return portal ? createPortal(children, portal) : null;
  }

  return null;
};

export default Portal;
