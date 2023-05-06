import * as S from "./styled";

export type CommunityDetailModel = {
  _id: number;
  title: string;
  img_url: string;
  content: string;
  time: string;
  author: string;
  likeCnt: number;
  hateCnt: number;
  commentCnt: number;
  viewCnt: number;
  hashtags: string[];
};

interface CommunityDetailPageContainerProps {
  data: CommunityDetailModel;
}

function CommunityDetailPageContainer({ data }: CommunityDetailPageContainerProps) {
  console.log(data);
  return (
    <S.Container>
      <S.Divider />
      <S.MainSection>{/* <MainSection /> */}</S.MainSection>
      <S.Divider />
      <S.CommentSection>{/* <CommentSection /> */}</S.CommentSection>
    </S.Container>
  );
}

export default CommunityDetailPageContainer;
