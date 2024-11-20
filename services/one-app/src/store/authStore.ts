import { z } from 'zod';
import { create } from 'zustand';
import { LoginResponseSchema } from '@/app/(site)/login/_lib/requestLogin';

type TemporaryUserAuthData = Pick<
  z.infer<typeof LoginResponseSchema>['result'],
  'accessToken' | 'refreshToken'
>;

type State = {
  auth: TemporaryUserAuthData | null;
};

type Action = {
  setTempAuth: (authData: State['auth']) => void;
  reset: () => void;
};

const useTemporaryAuthStore = create<State & Action>((set) => ({
  auth: null,
  setTempAuth: (authData) => set({ auth: authData }),
  reset: () => set({ auth: null }),
}));

export { type TemporaryUserAuthData, useTemporaryAuthStore };
