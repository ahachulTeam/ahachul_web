import { css } from '@emotion/react'
import Image from 'next/image'
import { CardIcon, ComplaintCard } from '../../../list'

import * as S from './styled'
import { ComplaintCardVariant } from '@/types/variants'

const TemperatureContents: Record<
  string,
  {
    title: string
    content: string
    variant: ComplaintCardVariant
    imgName: string
    overrideCss: ReturnType<typeof css>
    subText: string
  }
> = {
  cold: {
    title: '추워요',
    content: '',
    variant: 'primary',
    imgName: 'c9',
    overrideCss: css`
      top: 11px;
      right: 13.85px;
      width: 77.064px;
      height: 111.487px;
    `,
    subText: '약냉방칸을 이용해 보세요!',
  },
  hot: {
    title: '더워요',
    content: '',
    variant: 'inactive',
    imgName: 'c5',
    overrideCss: css`
      top: 4px;
      left: 22px;
      width: 77.064px;
      height: 111.487px;
    `,
    subText: '최대한 빠르게 처리해드릴게요!',
  },
}

export default function Temperature() {
  return (
    <S.Container>
      <S.TemperatureSection>
        {Object.entries(TemperatureContents).map(([key, content]) => (
          <li key={key} onClick={() => void 0}>
            <ComplaintCard
              title={content.title}
              content={content.content}
              variant={content.variant}
              subText={content.subText}
              tabId={key}
              css={S.TemperatureCardStyle(key)}
            >
              <CardIcon overrideCss={content.overrideCss}>
                <Image fill priority src={`illust/${content.imgName}.svg`} alt="" />
              </CardIcon>
            </ComplaintCard>
          </li>
        ))}
      </S.TemperatureSection>
    </S.Container>
  )
}
