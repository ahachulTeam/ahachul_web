"use client";

import Image from "next/image";
import { ForwardedRef, forwardRef } from "react";

import { BottomSheet } from "@/components/common";

import { kakaoUrl, googleUrl } from "@/constants/auth";

import * as S from "./styled";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function LoginDrawer({ isOpen, onClose }: Props, ref: ForwardedRef<HTMLDialogElement>) {
  return (
    <BottomSheet ref={ref} title="로그인" isOpen={isOpen} onClose={onClose}>
      <S.ContentBox>
        <S.Link href={kakaoUrl}>
          <S.KakaoBtn>
            <Image src="/images/kakao.svg" alt="카카오 로고" width={21} height={19} />
            카카오 로그인
          </S.KakaoBtn>
        </S.Link>
        <S.Link href={googleUrl}>
          <S.GoogleBtn>
            <Image src="/images/google.svg" alt="구글 로고" width={21} height={19} />
            구글 로그인
          </S.GoogleBtn>
        </S.Link>
      </S.ContentBox>
    </BottomSheet>
  );
}

export default forwardRef(LoginDrawer);
