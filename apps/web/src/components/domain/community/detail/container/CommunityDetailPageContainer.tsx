import { useRouter } from 'next/router'
import Comments from '../comments/Comments'
import Contents from '../contents/Contents'
import * as S from './styled'
import useCommunityDetailQuery from '@/queries/community/useCommunityDetailQuery'

export const CommunityDetailPageContainer = () => {
  const { query } = useRouter()
  const { data: articleDetail } = useCommunityDetailQuery(parseInt(query?.id as string), {
    enabled: Boolean(query?.id),
  })

  return (
    <S.Container>
      <S.ContentSection>
        <Contents data={articleDetail?.result} />
      </S.ContentSection>
      <S.Divider />
      <S.CommentSection>
        <Comments />
      </S.CommentSection>
    </S.Container>
  )
}
