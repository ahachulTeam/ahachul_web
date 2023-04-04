"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session.user?.name}님 반갑습니다 <br />
        <button type="button" onClick={() => signOut()}>
          로그아웃
        </button>
      </>
    );
  }
  return (
    <>
      로그인되지 않았습니다 <br />
      <button type="button" onClick={() => signIn("kakao")}>
        로그인
      </button>
    </>
  );
}
