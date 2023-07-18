import { css } from '@emotion/react'

export default function Facilities() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div>신고 유형</div>
      <div>내용</div>
    </div>
  )
}
