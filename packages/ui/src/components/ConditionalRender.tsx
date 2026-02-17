/** @jsxImportSource react */
import type { ReactNode } from 'react';

export interface ConditionalRenderProps {
  children: ReactNode;
  isRender: boolean;
}

export const ConditionalRender = ({ isRender, children }: ConditionalRenderProps) => {
  return <>{isRender ? children : null}</>;
};
