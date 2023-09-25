import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'
import { CardIcon, ComplaintCard } from '../../components'

export const Violence = () => {
  return (
    <ComplaintCard title="폭력" content={`열차 내 폭행(싸움)\n발생시 신고하기`} variant="secondary">
      <CardIcon overrideCss={overrideCss}>
        <Image fill priority src="illust/c4.svg" alt="" />
      </CardIcon>
    </ComplaintCard>
  )
}

const overrideCss = css`
  bottom: 5.68px;
  right: 21.8px;
  width: 30.2px;
  height: 56.32px;
`
