import { fonts } from '@ahhachul/design-system'
import { Button } from '@ahhachul/ui'
import { css } from '@emotion/react'

export default function Announcement() {
  return (
    <div
      css={css`
        display: flex;
        gap: 15px;
        flex-direction: column;
        padding: 20px;
      `}
    >
      <div></div>
      <div>
        <div
          css={css`
            ${fonts.medium14};
            display: flex;
            align-items: center;
            height: 30px;
            width: 100%;
          `}
        >
          방송음량
        </div>
        <Button size="lg" variant="secondary" label="너무 커요" />
      </div>
      <div>
        <div
          css={css`
            ${fonts.medium14};
            display: flex;
            align-items: center;
            height: 30px;
            width: 100%;
          `}
        >
          요청
        </div>
        <Button size="lg" variant="secondary" label="행선 안내방송" />
      </div>
    </div>
  )
}
