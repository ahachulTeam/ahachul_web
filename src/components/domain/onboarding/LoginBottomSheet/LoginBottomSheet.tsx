"use client";

import Image from "next/image";
import { ForwardedRef, forwardRef } from "react";

import { BottomSheet } from "@/components/common";

import * as S from "./styled";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function LoginBottomSheet({ isOpen, onClose }: Props, ref: ForwardedRef<HTMLDialogElement>) {
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&access_type=offline&response_type=code&scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPE}`;

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

export default forwardRef(LoginBottomSheet);
