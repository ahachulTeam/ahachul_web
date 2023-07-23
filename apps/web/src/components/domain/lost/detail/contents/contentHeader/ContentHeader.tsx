import { getCurrentTime } from '@ahhachul/lib'
import { Badge } from '@ahhachul/ui'
import * as S from './ContentHeader.styled'
import { LostDetail } from '@/types/lost'

interface ContentHeaderProps {
  data?: LostDetail
}

export default function ContentHeader({ data }: ContentHeaderProps) {
  return (
    <S.ContentHeader>
      <S.TitleWrapper>
        <Badge variant={data?.subwayLine + '호선'} />
        <S.Title>{data?.title}</S.Title>
      </S.TitleWrapper>
      <S.Metadata>
        <span>{data?.writer ?? '홍길동'}</span>
        <span>{getCurrentTime(data?.date ?? '')}</span>
      </S.Metadata>
    </S.ContentHeader>
  )
}
