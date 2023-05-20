import Comments from '../comments/Comments'
import Contents from '../contents/Contents'
import * as S from './styled'
import { CommunityDetailModel } from '@/types/community'

interface CommunityDetailPageContainerProps {
  data: CommunityDetailModel
}

function CommunityDetailPageContainer({ data }: CommunityDetailPageContainerProps) {
  return (
    <S.Container>
      <S.ContentSection>
        <Contents data={data} />
      </S.ContentSection>
      <S.Divider />
      <S.CommentSection>
        <Comments />
      </S.CommentSection>
    </S.Container>
  )
}

export default CommunityDetailPageContainer
