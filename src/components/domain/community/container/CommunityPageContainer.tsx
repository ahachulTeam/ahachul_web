import { StaticSEO } from "@/constants/seo";
import ArticleList from "../articleList/ArticleList";

import * as S from "./styled";

function CommunityPageContainer() {
  return (
    <S.Container>
      <h2 css={S.visuallyHidden}>{StaticSEO.community.title}</h2>
      <S.Divider />
      <S.HashtagSection>
        <div>
          <h3 css={S.h3}>HOT 해쉬태그</h3>
          {/* <HashtagList /> */}
        </div>
      </S.HashtagSection>
      <S.Divider />
      <S.ListSection>
        <ArticleList />
      </S.ListSection>
    </S.Container>
  );
}

export default CommunityPageContainer;
