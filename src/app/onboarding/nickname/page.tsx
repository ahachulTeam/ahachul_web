"use client";

import { useState } from "react";

import useMyProfileMutation from "@/queries/user/useMyProfileMutation";
import { useVerifyNickname } from "@/queries/user/useVerifyNickname";

function NicknamePage() {
  const [nickname, setNickname] = useState<string>("");
  const { mutate: updateMyProfileMutate } = useMyProfileMutation();
  const { data, mutate: verifyNicknameMutate } = useVerifyNickname();

  const handleSubmitNickname = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname !== "" && data?.result.available) {
      updateMyProfileMutate({ nickname });
    } else {
      alert("실패했습니다.");
    }
  };

  const handleNicknameInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  const handleVerifyNickname = () => {
    verifyNicknameMutate({ nickname });
  };

  return (
    <div style={styles.flexCenter}>
      <form onSubmit={handleSubmitNickname} style={styles.flexColumn as React.CSSProperties}>
        <h3 style={styles.h3}>Update Your Nickname</h3>
        <input
          type="text"
          value={nickname}
          style={styles.input}
          onChange={handleNicknameInputChange}
        />
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

export default NicknamePage;

const styles = {
  h3: { fontSize: "18px" },
  input: { display: "block", width: "100%", height: "32px", border: "1px solid black" },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flexColumn: { display: "flex", direction: "column" },
};
