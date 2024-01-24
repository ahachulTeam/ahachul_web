import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ResponseDto } from "~/models/common";
import { TalkRoomDto } from "~/models/talk";

import { getTalkRoom } from "~/remotes/talk";

function useTalkRoom(): UseQueryResult<ResponseDto<TalkRoomDto>> {
  const router = useRouter();
  const slug = router.query.slug;
  const talkRoomId = (slug && slug[1]) as string;

  if (!talkRoomId) {
    throw new Error("talkRoomId must be specified");
  } else {
    return useQuery(["talk-room"], () => getTalkRoom(talkRoomId), {
      suspense: false,
    });
  }
}

export default useTalkRoom;
