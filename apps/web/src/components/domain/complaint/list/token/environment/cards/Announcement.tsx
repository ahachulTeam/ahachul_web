import { css } from '@emotion/react'
import Image from 'next/image'
import { CardIcon, ComplaintCard } from '../../components'

export const Announcement = () => {
  return (
    <ComplaintCard title="안내방송" content={`방송 불량, 음량문제\n요청까지 한번에`} variant="primary">
      <CardIcon overrideCss={overrideCss}>
        <Image fill priority src="illust/c2.svg" alt="" />
      </CardIcon>
    </ComplaintCard>
  )
}

const overrideCss = css`
  bottom: 5.48px;
  right: 12px;
  width: 50px;
  height: 50.52px;
`
