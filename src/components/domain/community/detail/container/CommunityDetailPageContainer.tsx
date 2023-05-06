import { StaticSEO } from "@/constants/seo";

import * as S from "./styled";

interface CommunityDetailPageContainerProps {
  data: {
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
}

function CommunityDetailPageContainer({ data }: CommunityDetailPageContainerProps) {
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
