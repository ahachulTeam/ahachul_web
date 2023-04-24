"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { APILoginUserProviders } from "@/types/auth";

import * as S from "./styled";

import useLoginMutation from "@/queries/auth/useLoginMutation";

function RedirectPageContainer() {
  const searchParams = useSearchParams();
  const providerCode = searchParams.get("code");
  const providerType = searchParams.get("type");

  const { mutate: mutateLogin } = useLoginMutation();

  useEffect(() => {
    if (!!providerCode && !!providerType) {
      mutateLogin({
        providerCode,
        providerType,
      } as APILoginUserProviders);
    }
  }, []);

  return <S.Redirect />;
}

export default RedirectPageContainer;
