'use client';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isRender: boolean;
}

/**
 * 자식 요소를 렌더할지 여부를 결정합니다.
 * 선언적으로 간편한 조건부 렌더링을 제공합니다.
 * @param props
 */
export const ConditionalRender = (props: Props) => {
  const { children, isRender } = props;
  return <>{isRender ? children : null}</>;
};
