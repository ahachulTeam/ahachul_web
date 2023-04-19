"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { keyframes, styled } from "styled-components";

import { getUserAccessToken } from "@/apis/auth";

function RedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const getAccessToken = async (code: string) => {
    // if (!kakaoAccessToken) {
    //   router.push("/404");
    //   return;
    // }
    const userToken = await getUserAccessToken(code);
    console.log(userToken);
    // if (!userToken) {
    //   router.push("/404");
    // }

    // timeout.current = setTimeout(() => {
    //   router.push("/");
    // }, 500);
  };

  useEffect(() => {
    const providerCode = searchParams.get("code");

    const hasAuthed = !!providerCode;

    if (hasAuthed) {
      getAccessToken(providerCode);
    }

    return () => clearTimeout(timeout.current as NodeJS.Timeout);
  }, []);

  return <Redirect />;
}

export default RedirectPage;

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const Redirect = styled.div`
  background-image: url("/illust/onboding/_3.svg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 530px;
  height: 324px;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  animation: ${slideUpAndFade} 1000ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
`;

// 1. login 성공 => access_token
// 2. 유저 api data 받아온다
// 3. api isSuccess =>

// 구글 로그인, 카카오 로그인

// const { isAuthed, setAuth } = useAuth();
// //   const { isSuccess, data, refetch } = useMyProfileQuery({ enabled: isAuthed });
// const { mutate } = useLoginMutation();

// useEffect(() => {
//   const hasAuthed = !!providerCode;

//   if (hasAuthed) {
//     console.log(providerCode);
//     // providerCode && setAuth(providerCode);
//     mutate({ providerType: "KAKAO", providerCode });
//     console.log(providerCode);
//     //   refetch();
//   }
// }, [providerCode]);

// useEffect(() => {
//   // if (!isSuccess) {
//   //   return;
//   // }

//   // if (!data?.nickname) {  // 초기 로그인한 유저냐 아니냐에 따라서 바로 앱으로 넘어갈거냐 추가 기입 페이지로 넘어갈거냐
//   //   router.replace("/profile/me/add");
//   //   return;
//   // }

//   if (isAuthed) {
//     // 초기 로그인한 유저가 아니면 바로 앱으로 넘어가게
//     router.replace("/");
//   }
// }, [isAuthed, router]);

// setCookie(COOKIE.ACCESS_TOKEN, userToken.accessToken, {
//   maxAge: COOKIE.ACCESS_MAX_AGE,
// });
// setCookie(COOKIE.REFRESH_TOKEN, userToken.refreshToken, {
//   maxAge: COOKIE.REFRESH_MAX_AGE,
// });
