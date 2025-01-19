import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import type { AuthTokens } from '@/types';

interface TempAuthState {
  tokens: AuthTokens | null;
  setTokens: (tokens: AuthTokens | null) => void;
  clearTokens: () => void;
}

const useTempAuthStore = create<TempAuthState>(set => ({
  tokens: null,
  setTokens: tokens => set({ tokens }),
  clearTokens: () => set({ tokens: null }),
}));

export const useTempAuth = () => {
  const tempTokens = useTempAuthStore(useShallow(state => state.tokens));
  const setTempTokens = useTempAuthStore(useShallow(state => state.setTokens));
  const clearTempTokens = useTempAuthStore(useShallow(state => state.clearTokens));

  return { tempTokens, setTempTokens, clearTempTokens };
};
