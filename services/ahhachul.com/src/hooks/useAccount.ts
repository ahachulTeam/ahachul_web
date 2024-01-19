import { useQuery } from "@tanstack/react-query";

import { getAccount } from "@remotes/account";
import useUser from "./useUser";

function useAccount() {
  const user = useUser();

  return useQuery(["account", user?.id], () => getAccount(user?.id as string), {
    enabled: user != null,
  });
}

export default useAccount;
