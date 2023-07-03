import { css } from '@emotion/react'
import Image from 'next/image'
import { CardIcon, ComplaintCard } from '../components'
import * as S from './styled'
import { ComplaintTargets } from '@/types/complaint'
import { ComplaintCardVariant } from '@/types/variants'

const EmergencyContents = {
  patient: {
    title: '응급환자',
    content: `열차 내 응급환자\n긴급 신고하기`,
    variant: 'secondary',
    imgName: 'c3',
    fullHeight: false,
    overrideCss: css`
      bottom: 10.1px;
      right: 9.5px;
      width: 54.5px;
      height: 46.9px;
    `,
  },
  sexual: {
    title: '성추행',
    content: `열차 내 성폭력, 몰래카메라 등 \n발생시 신고하기`,
    variant: 'primary',
    imgName: 'c7',
    fullHeight: true,
    overrideCss: css`
      right: 12.32px;
      width: 147.68px;
      height: 95.99px;
    `,
  },
  violence: {
    title: '폭력',
    content: `열차 내 폭행(싸움)\n발생시 신고하기`,
    variant: 'secondary',
    imgName: 'c4',
    fullHeight: false,
    overrideCss: css`
      bottom: 5.68px;
      right: 21.8px;
      width: 30.2px;
      height: 56.32px;
    `,
  },
}

interface EmergencyContainer {
  toggleShowing: (target: ComplaintTargets) => () => void
}

export default function Emergency({ toggleShowing }: EmergencyContainer) {
  return (
    <S.Emergency>
      <S.Title>긴급상황 🚨</S.Title>
      <S.EmergencyCardList>
        {Object.entries(EmergencyContents).map(([key, content]) => {
          return (
            <li key={key} onClick={toggleShowing(key as ComplaintTargets)}>
              <ComplaintCard
                css={css`
                  min-height: ${content?.fullHeight && '100%'};
                `}
                title={content.title}
                content={content.content}
                variant={content.variant as ComplaintCardVariant}
                tabId={key}
              >
                <CardIcon overrideCss={content.overrideCss}>
                  <Image fill priority src={`illust/${content.imgName}.svg`} alt="" />
                </CardIcon>
              </ComplaintCard>
            </li>
          )
        })}
      </S.EmergencyCardList>
    </S.Emergency>
  )
}

{
  /* <li>
<Patient />
</li>
<li>
<Sexual />
</li>
<li>
<Violence />
</li> */
}
