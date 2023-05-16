import { CommunityDetailModel } from "@/types/community";
import Comments from "../comments/Comments";
import Contents from "../contents/Contents";
import * as S from "./styled";

interface CommunityDetailPageContainerProps {
  data: CommunityDetailModel;
}

function CommunityDetailPageContainer({ data }: CommunityDetailPageContainerProps) {
  return (
    <S.Container>
      <S.ContentSection>
        <Contents data={data} />
      </S.ContentSection>
      <S.Divider />
      <S.CommentSection>
        <Comments data={data} />
      </S.CommentSection>
    </S.Container>
  );
}

export default CommunityDetailPageContainer;
