import { type IResponse } from 'entities/with-server';
import { base, routes, useAuthMutation } from 'shared/api';

interface APICheckNicknameParams {
  nickname: string;
}
interface APINicknameResponse {
  available: boolean;
}

const checkNickname = (body: APICheckNicknameParams) =>
  base.post<IResponse<APINicknameResponse>>(
    `${routes.users}/check-nickname`,
    body,
  );
export const useCheckNickName = () =>
  useAuthMutation({ mutationFn: checkNickname });
