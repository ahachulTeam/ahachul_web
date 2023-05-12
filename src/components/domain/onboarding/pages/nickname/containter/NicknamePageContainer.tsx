"use client";

import { useState } from "react";

import * as S from "./styled";

import useMyProfileMutation from "@/queries/user/useMyProfileMutation";
import { useVerifyNickname } from "@/queries/user/useVerifyNickname";

function NicknamePageContainer() {
  const [nickname, setNickname] = useState<string>("");
  const { mutate: updateMyProfileMutate } = useMyProfileMutation();
  const { data, mutate: verifyNicknameMutate } = useVerifyNickname();

  const handleSubmitNickname = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname === "") {
      alert("닉네임을 제대로 입력해주세요.");
    } else if (!data?.result.available) {
      alert("닉네임 중복체크를 해주세요.");
    } else {
      updateMyProfileMutate({ nickname });
    }
  };

  const handleNicknameInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  const handleVerifyNickname = () => {
    verifyNicknameMutate({ nickname });
  };

  return (
    <div css={S.flexCenter}>
      <form onSubmit={handleSubmitNickname} css={S.flexColumn}>
        <S.H3>Update Your Nickname</S.H3>
        <br />
        <S.Input type="text" value={nickname} onChange={handleNicknameInputChange} />
        <br />
        <button type="button" onClick={handleVerifyNickname}>
          중복체크
        </button>
        <br />
        <button type="submit" onClick={handleSubmitNickname}>
          닉네임 제출하기
        </button>
      </form>
    </div>
  );
}

export default NicknamePageContainer;
