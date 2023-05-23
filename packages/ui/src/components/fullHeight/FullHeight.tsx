import { isServer } from '@ahhachul/lib'
import { css } from '@emotion/react'
import { HTMLAttributes, ReactNode, useEffect, useLayoutEffect, useState } from 'react'

const useIsomorphicLayoutEffect = isServer() ? useEffect : useLayoutEffect

/**
 * @description height가 window.innerHeight인 div 컨테이너입니다. 모바일 화면을 꽉 채우는 페이지를 구현할 때 유용합니다.
 */
export function FullHeight({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  const [height, setHeight] = useState(0)

  useIsomorphicLayoutEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  return (
    <div
      css={css`
        height: ${height}px;
        overflow: hidden;
      `}
      {...props}
    >
      {children}
    </div>
  )
}
