"use client";

import { useRouter } from "next/navigation";
import AhHachulSuperModel from "public/illust/c8.svg";
import SubwayIllust from "public/illust/m1.svg";

import { ArrowIcon } from "@/assets/icons";

import * as S from "./styled";

function SubwayInfo() {
  const router = useRouter();
  const handleRouteSettingSubway = () => router.push("/my-page");

  return (
    <S.SubwayInfo className="temporary swipe banner">
      <S.ThickBorderArea tabIndex={-1}>
        <S.AhHachulLabel>아하철역</S.AhHachulLabel>
        <S.SubwayIllustImage>
          <SubwayIllust />
        </S.SubwayIllustImage>
      </S.ThickBorderArea>
      <S.ContentArea>
        <S.AhHachulSuperModelImage>
          <AhHachulSuperModel />
        </S.AhHachulSuperModelImage>
        <S.Box>
          <S.Desc>
            <strong>아하철</strong>님 <br />
            열차정보와 혼잡도가 <br />
            궁금하다면?
          </S.Desc>
          <S.AddBtn type="button" onClick={handleRouteSettingSubway}>
            전철역 추가하기
            <ArrowIcon />
          </S.AddBtn>
        </S.Box>
      </S.ContentArea>
    </S.SubwayInfo>
  );
}

export default SubwayInfo;
