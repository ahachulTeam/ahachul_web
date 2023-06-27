import Comments from '../comments/Comments'
import * as S from './styled'

export const CommunityDetailPageContainer = () => {
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
