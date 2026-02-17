import { type SocialSignInType } from '@/types';

import { login } from '../callback/_lib/login';

export function requestLogin(params: { type: SocialSignInType; code: string }) {
  return login(params);
}
