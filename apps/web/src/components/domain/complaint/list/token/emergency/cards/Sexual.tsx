import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'
import { CardIcon, ComplaintCard } from '../../components'

export const Sexual = () => {
  return (
    <ComplaintCard
      title="성추행"
      content={`열차 내 성폭력, 몰래카메라 등 \n발생시 신고하기`}
      variant="primary"
      css={{ minHeight: '100%' }}
    >
      <CardIcon overrideCss={overrideCss}>
        <Image fill priority src="illust/c7.svg" alt="" />
      </CardIcon>
    </ComplaintCard>
  )
}

const overrideCss = css`
  right: 12.32px;
  width: 147.68px;
  height: 95.99px;
`
