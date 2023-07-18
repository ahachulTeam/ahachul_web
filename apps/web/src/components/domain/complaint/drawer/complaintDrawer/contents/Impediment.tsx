import { css } from '@emotion/react'

export default function Impediment() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div>신고 유형을 선택해주세요</div>
      <div>내용</div>
    </div>
  )
}
