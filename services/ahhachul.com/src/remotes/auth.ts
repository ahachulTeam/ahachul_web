import axios from "axios";

import { getApiEndpoint } from "~/envs";

export const renewAccessToken = async (refreshToken: string) => {
  const res = await axios.post(`${getApiEndpoint()}/auth/token/refresh`, {
    refreshToken,
  });

  return res.data;
};
