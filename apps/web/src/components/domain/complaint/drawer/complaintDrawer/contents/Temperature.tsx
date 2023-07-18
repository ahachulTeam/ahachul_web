import { css } from '@emotion/react'

export default function Temperature() {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div>추워요</div>
      <div>더워요</div>
    </div>
  )
}
