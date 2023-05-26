import { useBoolean } from '@ahhachul/lib'
import Comments from '../comments/Comments'
import Contents from '../contents/Contents'
import * as S from './styled'
import { CommunityDetailModel } from '@/types/community'

interface CommunityDetailPageContainerProps {
  data: CommunityDetailModel
}

export const CommunityDetailPageContainer = ({ data }: CommunityDetailPageContainerProps) => {
  const [value] = useBoolean(Boolean(data))

  console.log('isDetailInfo ?', value)

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
