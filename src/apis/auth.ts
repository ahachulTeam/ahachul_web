import { APIUser } from "@/types/user";

import { ax } from "./axios";

export interface APILoginProviders {
  providerType: "KAKAO" | "GOOGLE";
  providerCode: string;
}

const authAPI = {
  getRedirectUrl: (providerType: APILoginProviders["providerType"]) =>
    ax.get(`v1/auth/redirect-url?providerType=${providerType}`),
  login: (providers: APILoginProviders) => {
    console.log(providers);
    return ax.post<APIUser>("/v1/auth/login", providers);
  },
  // logout: () => ax.get<APIUser>("/users/me"),
};

export default authAPI;

export const getUserAccessToken = async (kakao_token: string) => {
  console.log(kakao_token);
  try {
    const { data } = await ax.post("/v1/auth/login", {
      providerType: "KAKAO",
      providerCode: kakao_token,
    });

    console.log(data);

    return {
      accessToken: data.data.access_token,
      refreshToken: data.data.refresh_token,
    };
  } catch (error) {
    return null;
  }
};

// 1. redirect uri를 받는다.
// 2. 받은 uri에 인가코드랑 프로바이더타입 보낸다.
// 3. 그러면 로그인 완성 (?)
