import { ResponseDto } from "~/models/common";
import {
  TalkLoungeFilterType,
  TalkLoungeDto,
  TalkRoomDto,
} from "~/models/talk";
import { ax } from "./axios";

export const getTalkLounge = async (req: TalkLoungeFilterType) => {
  const res = await ax.get<ResponseDto<TalkLoungeDto>>("/community-posts", {
    params: req,
  });

  return res.data;
};

export const getTalkRoom = async (talkRoomId: string) => {
  const res = await ax.get<ResponseDto<TalkRoomDto>>(
    `/community-posts/${talkRoomId}`,
  );

  return res.data;
};
