import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { ResponseDto } from "~/models/common";
import { getHashTagRank } from "~/remotes/common";
import * as T from "~/utils/fp/try";

export const useHashtagRank = (): UseQueryResult<
  ResponseDto<{ ranks: string[] }>
> => {
  return useQuery(
    ["hashTag-ranks"],
    async () => {
      const res = await getHashTagRank();
      const parsedData = T.parseResponse(res);
      return T.getOrElse(parsedData, () => ({ ranks: [{}] }));
    },
    {
      suspense: true,
    },
  );
};
