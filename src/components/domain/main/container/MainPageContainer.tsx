import Community from "../community/Community";
import News from "../news/News";
import SubwayInfo from "../subwayInfo/SubwayInfo";
import Link from "next/link";

import { StaticSEO } from "@/constants/seo";

import { ArrowIcon } from "@/assets/icons";

import * as S from "./styled";

import { PATH } from "@/constants";

export type MainPageContainerProps = {
  isAuthed?: boolean;
};

function MainPageContainer({ isAuthed = false }: MainPageContainerProps) {
  return (
    <S.Container>
      <h2 css={S.visuallyHidden}>{StaticSEO.main.title}</h2>
      <S.SubwayInfoSection>
        <h3 css={S.visuallyHidden}>지하철 열차정보와 혼잡도가 궁금하다면?</h3>
        <SubwayInfo />
      </S.SubwayInfoSection>
      <S.Divider />
      <S.NewsSection>
        <div css={S.bannerSectionTitle}>
          <h3 css={S.h3}>
            <b>지하철</b> HOT 소식
          </h3>
        </div>
        <News />
      </S.NewsSection>
      <S.Divider />
      <S.CommunitySection>
        <div>
          <h3 css={S.h3}>
            <b>실시간</b> HOT 게시물
          </h3>
          <Link href={PATH.BOARD} aria-label="커뮤니티 페이지 링크 버튼">
            <ArrowIcon />
          </Link>
        </div>
        <Community />
      </S.CommunitySection>
    </S.Container>
  );
}

export default MainPageContainer;
