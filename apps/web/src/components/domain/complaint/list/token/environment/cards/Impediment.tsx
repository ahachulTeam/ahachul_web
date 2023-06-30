import { css } from '@emotion/react'
import Image from 'next/image'
import { CardIcon, ComplaintCard } from '../../components'

export const Impediment = () => {
  return (
    <ComplaintCard
      title="질서저해"
      content={`취객, 노숙, 구걸, 소란\n열차 내 질서저해`}
      variant="secondary"
      tabId="impediment"
    >
      <CardIcon overrideCss={overrideCss}>
        <Image fill priority src="illust/c6.svg" alt="" />
      </CardIcon>
    </ComplaintCard>
  )
}

const overrideCss = css`
  right: -4.92px;
  width: 74.92px;
  height: 63.53px;
`
