import { APILoginUser, APILoginUserProviders } from "@/types/auth";
import { StandardResponse } from "@/types/common";

import { ax } from "./axios";

const authAPI = {
  login: async (providers: APILoginUserProviders): Promise<StandardResponse<APILoginUser>> => {
    const res = await ax.post("/v1/auth/login", providers);
    return res.data;
  },
};

export default authAPI;
