"use client";

import Link from "next/link";

import useMyProfileQuery from "@/queries/user/useMyProfileQuery";

function MyPage() {
  const { data: myProfile, refetch } = useMyProfileQuery({ enabled: false });

  return (
    <div>
      안녕하세요 {myProfile?.nickname}님, 아하철 MyPage입니다.
      <br />
      혹은
      <br />
      <button type="button" onClick={() => refetch()}>
        refetch
      </button>
      <br />
      <Link href="/onboarding/nickname">프로필을 수정하시겠습니까 ?</Link>
    </div>
  );
}

export default MyPage;
