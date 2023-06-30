import { css } from '@emotion/react'
import Image from 'next/image'
import { CardIcon, ComplaintCard } from '../../components'

export const Temperature = () => {
  return (
    <ComplaintCard title="온도조절" content={`너무 덥거나\n너무 추울때`} variant="primary" tabId="temperature">
      <CardIcon overrideCss={overrideCss}>
        <Image fill priority src="illust/c5.svg" alt="" />
      </CardIcon>
    </ComplaintCard>
  )
}

const overrideCss = css`
  right: 10.41px;
  width: 73.59px;
  height: 100%;
`
