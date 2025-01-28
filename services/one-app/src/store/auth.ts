import { create } from 'zustand';

type TempAuthData = {
  accessToken: string;
  refreshToken: string;
};

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
