import { z } from 'zod';
import { create } from 'zustand';

import { LoginResponseSchema } from '@/app/(site)/login/_lib';

export type TemporaryUserAuthData = Pick<
  z.infer<typeof LoginResponseSchema>['result'],
  'accessToken' | 'refreshToken'
>;

interface TemporaryAuthState {
  auth: TemporaryUserAuthData | null;
  setTempAuth: (authData: TemporaryUserAuthData) => void;
  reset: () => void;
}

export const useTemporaryAuthStore = create<TemporaryAuthState>((set) => ({
  auth: null,
  setTempAuth: (authData: TemporaryUserAuthData) => set({ auth: authData }),
  reset: () => set({ auth: null }),
}));
