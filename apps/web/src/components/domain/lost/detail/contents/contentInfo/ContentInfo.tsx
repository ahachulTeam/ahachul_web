import ContentDetail from './contentDetail/ContentDetail'
import * as S from './ContentInfo.styled'
import { useOwnArticle } from '@/hooks/domains/user/useOwnArticle'
import { LostDetail } from '@/types/lost'

interface ContentInfoProps {
  data?: LostDetail
}

export default function ContentInfo({ data }: ContentInfoProps) {
  const isOwner = useOwnArticle(data?.createdBy)

  return (
    <S.ContentInfo>
      <S.Texts>{data?.content}</S.Texts>
      <ContentDetail />
      {!isOwner && <S.ReportBtn type="button">이 게시물 신고하기</S.ReportBtn>}
    </S.ContentInfo>
  )
}
