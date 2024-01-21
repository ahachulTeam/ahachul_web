import { useQuery } from "@tanstack/react-query";

import { getEventBanners } from "~/remotes/banner";
import useAccount from "~/hooks/useAccount";

function useEventBanners() {
  const { data: account } = useAccount();

  return useQuery(
    ["event-banners"],
    () =>
      getEventBanners({
        hasAccount: account != null,
      }),
    {
      suspense: true,
    },
  );
}

export default useEventBanners;
