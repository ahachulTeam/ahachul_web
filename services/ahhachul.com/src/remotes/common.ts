import { ResponseDto } from "~/models/common";
import { ax } from "./axios";

export const getHashTagRank = async () => {
  const res = await ax.get<ResponseDto<{ ranks: string[] }>>("ranks/hashtags");
  return res.data;
};
