"use client";

// import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import useAuth from "@/hooks/auth/useAuth";

// import useMyProfileQuery from "@/queries/user/useMyProfileQuery";

function RedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = searchParams.get("access_token");

  const { isAuthed, setAuth } = useAuth();
  //   const { isSuccess, data, refetch } = useMyProfileQuery({ enabled: isAuthed });

  useEffect(() => {
    const hasAuthed = !!accessToken;

    if (hasAuthed) {
      accessToken && setAuth(accessToken);
      //   refetch();
    }
  }, [accessToken, setAuth]);

  useEffect(() => {
    // if (!isSuccess) {
    //   return;
    // }

    // if (!data?.nickname) {  // 초기 로그인한 유저냐 아니냐에 따라서 바로 앱으로 넘어갈거냐 추가 기입 페이지로 넘어갈거냐
    //   router.replace("/profile/me/add");
    //   return;
    // }

    if (isAuthed) {
      // 초기 로그인한 유저가 아니면 바로 앱으로 넘어가게
      router.replace("/");
    }
  }, [isAuthed, router]);

  return <div>loading...</div>;
}

export default RedirectPage;

// 1. login 성공 => access_token
// 2. 유저 api data 받아온다
// 3. api isSuccess =>

// 구글 로그인, 카카오 로그인
