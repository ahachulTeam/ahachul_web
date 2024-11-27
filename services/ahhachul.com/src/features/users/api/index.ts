import axios from 'axios';
import { IToken } from 'entities/app-authentications';
import { type IResponse } from 'entities/with-server';
import { base, routes, useAuthMutation, useAuthQuery } from 'shared/api';

export const GET_USER_INFO_QUERY_KEY = ['USER', 'INFO'];

interface APICheckNicknameParams {
  nickname: string;
}
interface APINicknameResponse {
  available: boolean;
}
interface APIUpdateUserResponse {
  nickname: string;
  gender: string | null;
  ageRange: string | null;
}

interface APIUserInfoResponse {
  memberId: number;
  nickname: string;
  email: string | null;
  gender: string | null;
  ageRange: string | null;
}

const checkNickname = (body: APICheckNicknameParams) =>
  base.post<IResponse<APINicknameResponse>>(
    `${routes.users}/check-nickname`,
    body,
  );
export const useCheckNickName = () =>
  useAuthMutation({ mutationFn: checkNickname });

export const updateUser = async (data: { nickname: string; auth: IToken }) => {
  try {
    const accessToken = data.auth.accessToken;
    const res = await axios.patch<APIUpdateUserResponse>(
      `${process.env.REACT_APP_BASE_URL}/members`,
      { nickname: data.nickname },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Update user failed: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error('Unexpected error during user update:', error);
      throw new Error('An unexpected error occurred during user update.');
    }
  }
};

const getUserInfo = () =>
  base.get<IResponse<APIUserInfoResponse>>(routes.users);

export const useGetUserInfo = (auth: Nullable<IToken>) =>
  useAuthQuery({
    queryFn: getUserInfo,
    queryKey: GET_USER_INFO_QUERY_KEY,
    options: {
      enabled: !!auth,
      staleTime: 10 * 60 * 1000,
      select: (res) => res.data.result,
    },
  });
