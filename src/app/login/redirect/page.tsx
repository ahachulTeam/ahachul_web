"use client";

// import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import useAuth from "@/hooks/auth/useAuth";

// import useMyProfileQuery from "@/queries/user/useMyProfileQuery";

function RedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = searchParams.get("code");

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

    // if (!data) {
    //   router.replace("/profile/me/add");
    //   return;
    // }

    if (isAuthed) {
      router.replace("/");
    }
  }, [isAuthed, router]);

  return <div>loading...</div>;
}

export default RedirectPage;
