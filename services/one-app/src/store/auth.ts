import { z } from 'zod';
import { create } from 'zustand';
import { LoginResponseSchema } from '@/app/(site)/login/_lib/requestLogin';

export type UserAuthData = Pick<
  z.infer<typeof LoginResponseSchema>['result'],
  'accessToken' | 'refreshToken'
>;

interface TemporaryAuthState {
  auth: UserAuthData | null;
  setTempAuth: (authData: UserAuthData) => void;
  reset: () => void;
}

export const useTemporaryAuthStore = create<TemporaryAuthState>((set) => ({
  auth: null,
  setTempAuth: (authData: UserAuthData) => set({ auth: authData }),
  reset: () => set({ auth: null }),
}));
