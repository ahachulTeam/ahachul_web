import { z } from 'zod';
import { create } from 'zustand';

import { LoginResponseSchema } from '@/app/(main-service)/community/login/_lib';

export type TempAuthData = Pick<
  z.infer<typeof LoginResponseSchema>['result'],
  'accessToken' | 'refreshToken'
>;

interface TempAuthState {
  auth: TempAuthData | null;
  setTempAuth: (authData: TempAuthData) => void;
  reset: () => void;
}

export const useTempAuthStore = create<TempAuthState>(set => ({
  auth: null,
  setTempAuth: (authData: TempAuthData) => set({ auth: authData }),
  reset: () => set({ auth: null }),
}));
