import { useQuery } from "@tanstack/react-query";

import authAPI, { APILoginProviders } from "@/apis/auth";

const useRedirectQuery = (providerType: APILoginProviders["providerType"]) => {
  return useQuery(
    ["user"],
    async () => {
      const { data } = await authAPI.getRedirectUrl(providerType);
      return data;
    },
    { enabled: false }
  );
};

export default useRedirectQuery;
