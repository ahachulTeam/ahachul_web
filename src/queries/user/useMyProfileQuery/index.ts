import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import userAPI from "@/apis/users";

type Options = Pick<
  UseQueryOptions<Awaited<ReturnType<typeof userAPI.getMyProfile>>["result"]>,
  "enabled"
>;

const useMyProfileQuery = (options?: Options) =>
  useQuery(["user", "me"], () => userAPI.getMyProfile(), { ...options, select: res => res.result });

export default useMyProfileQuery;
