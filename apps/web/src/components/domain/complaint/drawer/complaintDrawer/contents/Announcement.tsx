import { css } from '@emotion/react'

export default function Announcement() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div>방송음량</div>
      <div>요청</div>
    </div>
  )
}
