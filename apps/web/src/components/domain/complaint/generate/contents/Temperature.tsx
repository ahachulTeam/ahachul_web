import { useState, useEffect } from 'react'

import { css } from '@emotion/react'
import Image from 'next/image'
import { CardIcon, ComplaintCard } from '../../list'

import * as S from './styled'
import { ComplaintCardVariant } from '@/types/variants'
import { useComplaintContext } from '../container'

const TemperatureContents: (target: 'cold' | 'hot') => Record<
  string,
  {
    title: string
    content: string
    variant: ComplaintCardVariant
    imgName: string
    overrideCss: ReturnType<typeof css>
    subText: string
  }
> = target => ({
  cold: {
    title: '추워요',
    content: '',
    variant: target === 'cold' ? 'primary' : 'inactive',
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
    variant: target === 'hot' ? 'primary' : 'inactive',
    imgName: 'c5',
    overrideCss: css`
      top: 4px;
      left: 22px;
      width: 77.064px;
      height: 111.487px;
    `,
    subText: '최대한 빠르게 처리해드릴게요!',
  },
})

export default function Temperature() {
  const { setMessage } = useComplaintContext()

  const [target, setTarget] = useState<'cold' | 'hot'>('cold')

  useEffect(() => {
    if (target === 'cold') {
      setMessage('너무 추워요!')
      return
    }
    setMessage('너무 더워요!')
  }, [target])

  return (
    <S.Container>
      <S.TemperatureSection>
        {Object.entries(TemperatureContents(target)).map(([key, content]) => (
          <li
            key={key}
            onClick={() => {
              setTarget(key as 'hot' | 'cold')
            }}
          >
            <ComplaintCard
              title={content.title}
              content={content.content}
              variant={content.variant}
              subText={content.subText}
              css={S.TemperatureCardStyle(key)}
            >
              <CardIcon overrideCss={content.overrideCss}>
                <Image fill priority src={`/illust/${content.imgName}.svg`} alt="" />
              </CardIcon>
            </ComplaintCard>
          </li>
        ))}
      </S.TemperatureSection>
    </S.Container>
  )
}
