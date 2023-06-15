import Comments from '../comments/Comments'
import Contents from '../contents/Contents'
import * as S from './styled'
// import useCommunityDetailQuery from '@/queries/community/useCommunityDetailQuery'

export const CommunityDetailPageContainer = () => {
  // const { data: detailData } = useCommunityDetailQuery(1)
  // console.log(detailData)

  return (
    <S.Container>
      <S.ContentSection>{/* <Contents data={detailData} /> */}</S.ContentSection>
      <S.Divider />
      <S.CommentSection>
        <Comments />
      </S.CommentSection>
    </S.Container>
  )
}
