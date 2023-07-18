import { css } from '@emotion/react'

export default function Violence() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div>빠른 민원처리를 위해 선택해주세요</div>
      <div>내용</div>
    </div>
  )
}
