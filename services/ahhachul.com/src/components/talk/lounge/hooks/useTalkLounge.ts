import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useRouter } from "next/router";

import { getTalkLounge } from "~/remotes/talk";
import { type ResponseDto } from "~/models/common";
import type { TalkLoungeDto, TalkLoungeFilterType } from "~/models/talk";
import * as T from "~/utils/fp/try";
import { removeEmptyProperties } from "~/utils/helper/format";

function useTalkLounge(): UseInfiniteQueryResult<ResponseDto<TalkLoungeDto>> {
  const router = useRouter();
  const slug = router.query.slug;

  const size = 12;
  const fixedSortString = "desc";
  const sort = [router.query?.sort ?? "createdAt", fixedSortString].join(",");

  const content = router.query.content;
  const hashTag = router.query.hashTag;
  const hotPostYn = (!slug || slug[0] === "rank") && "Y";
  const categoryType = !hotPostYn && (slug ? slug[0] : "rank").toUpperCase();

  const filter = removeEmptyProperties({
    size,
    sort,
    content,
    hashTag,
    hotPostYn,
    categoryType,
  }) as Omit<TalkLoungeFilterType, "page">;

  return useInfiniteQuery(
    ["talk-lounge"],
    async ({ pageParam = 0 }) => {
      const res = await getTalkLounge({
        ...filter,
        page: pageParam,
      });
      const parsedData = T.parseResponse(res);
      return T.getOrElse(parsedData, () => ({
        posts: [],
        hasNext: false,
        nextPageNum: 0,
      }));
    },
    {
      suspense: true,
      getNextPageParam: (lastPage) => lastPage.hasNext && lastPage.nextPageNum,
    },
  );
}

export default useTalkLounge;
