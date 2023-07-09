import { css } from '@emotion/react'
import Image from 'next/image'
import { CardIcon, ComplaintCard } from '../components'
import * as S from './styled'
import { ComplaintTargets } from '@/types/complaint'
import { ComplaintCardVariant } from '@/types/variants'

const EnvironmentContents = {
  facilities: {
    title: '시설 · 환경민원',
    content: `토사물, 오물, 객실환기\n각종 환경민원`,
    variant: 'secondary',
    imgName: 'c1',
    overrideCss: css`
      bottom: 7.59px;
      right: 16.78px;
      width: 46.22px;
      height: 42.93px;
    `,
  },
  temperature: {
    title: '온도조절',
    content: `너무 덥거나\n너무 추울때`,
    variant: 'primary',
    imgName: 'c5',
    overrideCss: css`
      right: 10.41px;
      width: 73.59px;
      height: 100%;
    `,
  },
  announcement: {
    title: '안내방송',
    content: `방송 불량, 음량문제\n요청까지 한번에`,
    variant: 'primary',
    imgName: 'c2',
    overrideCss: css`
      bottom: 5.48px;
      right: 12px;
      width: 50px;
      height: 50.52px;
    `,
  },
  impediment: {
    title: '질서저해',
    content: `취객, 노숙, 구걸, 소란\n열차 내 질서저해`,
    variant: 'secondary',
    imgName: 'c6',
    overrideCss: css`
      right: -4.92px;
      width: 74.92px;
      height: 63.53px;
    `,
  },
}

interface EnvironmentContainer {
  toggleShowing: (target: ComplaintTargets) => () => void
}

export default function Environment({ toggleShowing }: EnvironmentContainer) {
  return (
    <S.Environment>
      <S.Title>지하철 환경</S.Title>
      <S.EnvironmentCardList>
        {Object.entries(EnvironmentContents).map(([key, content]) => {
          return (
            <li key={key}>
              <article onClick={toggleShowing(key as ComplaintTargets)}>
                <ComplaintCard
                  title={content.title}
                  content={content.content}
                  variant={content.variant as ComplaintCardVariant}
                  tabId={key}
                >
                  <CardIcon overrideCss={content.overrideCss}>
                    <Image fill priority src={`illust/${content.imgName}.svg`} alt="" />
                  </CardIcon>
                </ComplaintCard>
              </article>
            </li>
          )
        })}
      </S.EnvironmentCardList>
    </S.Environment>
  )
}
