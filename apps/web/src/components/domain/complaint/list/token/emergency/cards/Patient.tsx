import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'
import { CardIcon, ComplaintCard } from '../../components'

export const Patient = () => {
  return (
    <ComplaintCard title="응급환자" content={`열차 내 응급환자\n긴급 신고하기`} variant="secondary" tabId="patient">
      <CardIcon overrideCss={overrideCss}>
        <Image fill priority src="illust/c3.svg" alt="" />
      </CardIcon>
    </ComplaintCard>
  )
}

const overrideCss = css`
  bottom: 10.1px;
  right: 9.5px;
  width: 54.5px;
  height: 46.9px;
`
