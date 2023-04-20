"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { styled } from "styled-components";

import { APILoginProviders } from "@/types/auth";

import { animations } from "@/styles/themes/foundations";

import useLoginMutation from "@/queries/auth/useLoginMutation";

function RedirectPage() {
  const searchParams = useSearchParams();
  const providerCode = searchParams.get("code");
  const providerType = searchParams.get("type");

  const { mutate: mutateLogin } = useLoginMutation();

  useEffect(() => {
    if (!!providerCode && !!providerType) {
      const providers: APILoginProviders = {
        providerCode,
        providerType: providerType as APILoginProviders["providerType"],
      };
      mutateLogin(providers);
    }
  }, []);

  return <Redirect />;
}

export default RedirectPage;

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
  animation: ${animations.slideUpAndFade} 1000ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
`;

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
