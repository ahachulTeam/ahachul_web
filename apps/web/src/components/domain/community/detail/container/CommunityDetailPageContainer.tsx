import { useRouter } from 'next/router'
import Comments from '../comments/Comments'
import Contents from '../contents/Contents'
import * as S from './styled'
import { useCommunityCommentsQuery } from '@/queries/community/useCommunityComments'
import useCommunityDetailQuery from '@/queries/community/useCommunityDetailQuery'

export const CommunityDetailPageContainer = () => {
  const { query } = useRouter()
  const { data: articleDetail } = useCommunityDetailQuery(parseInt(query?.id as string), {
    enabled: Boolean(query?.id),
  })

  const { data: comments } = useCommunityCommentsQuery(parseInt(query?.id as string), {
    enabled: Boolean(query?.id),
  })

  console.log(comments)

  return (
    <S.Container>
      <S.ContentSection>
        <Contents data={articleDetail?.result} />
      </S.ContentSection>
      <S.Divider />
      <S.GenerateCommentSection>
        <Comments />
      </S.GenerateCommentSection>
      <S.CommentListSection>{/* {comments?.map} */}</S.CommentListSection>
    </S.Container>
  )
}
