import Image from 'next/image'
import Link from 'next/link'

import * as S from './OtherLostFoundItem.styled'

export default function OtherLostFoundItem() {
  return (
    <S.OtherLostFounditem>
      <S.Thumbnail>
        <Image src={'/images/default_thumbnail.svg'} fill alt="lost item thumbnail" />
      </S.Thumbnail>
      <S.Contents>
        <S.Title>삼성 갤럭시 스마트폰</S.Title>
        <S.Meta>
          <S.Metadata>
            <span>홍길동</span>
            <time>1분전</time>
          </S.Metadata>
        </S.Meta>
      </S.Contents>
      <Link css={S.link} href="" />
    </S.OtherLostFounditem>
  )
}
