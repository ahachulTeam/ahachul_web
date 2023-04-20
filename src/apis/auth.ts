import { APILoginProviders } from "@/types/auth";

import { ax } from "./axios";

const authAPI = {
  login: async (providers: APILoginProviders) => {
    const res = await ax.post("/v1/auth/login", providers);
    return res;
  },
};

export default authAPI;
