"use client";

import Community from "../community/Community";
import SwipeBanner from "../swipeBanner/SwipeBanner";
import Link from "next/link";

import { StaticSEO } from "@/constants/seo";

import { ArrowIcon } from "@/assets/icons";

import * as S from "./styled";

import { PATH } from "@/constants";

export type MainPageContainerProps = {
  isAuthed?: boolean;
};

function MainPageContainer({ isAuthed = false }: MainPageContainerProps) {
  console.log(isAuthed);

  return (
    <>
      <h1 css={S.visuallyHidden}>{StaticSEO.main.title}</h1>
      <h2 css={S.visuallyHidden}>{StaticSEO.main.subTitle}</h2>
      <S.SubwayInfoSection>
        <div>
          <h3 css={S.h3}> 아하철님 열차정보와 혼잡도가 궁금하다면?</h3>
        </div>
      </S.SubwayInfoSection>
      <S.Divider />
      <S.SwipeBannerSection>
        <div css={S.bannerSectionTitle}>
          <h3 css={S.h3}>🎙 전철역 HOT 소식</h3>
        </div>
        <SwipeBanner />
      </S.SwipeBannerSection>
      <S.Divider />
      <S.CommunitySection>
        <div>
          <h3 css={S.h3}>🤣 실시간 HOT 게시물</h3>
          <Link href={PATH.BOARD}>
            <ArrowIcon />
          </Link>
        </div>
        <Community />
      </S.CommunitySection>
    </>
  );
}

export default MainPageContainer;
