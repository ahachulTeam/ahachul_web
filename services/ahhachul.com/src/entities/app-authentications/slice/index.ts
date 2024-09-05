import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type IToken } from 'entities/app-authentications/model';

interface IAuthStore {
  state: IToken | null;
}

export const useAuthStore = create(
  persist<
    IAuthStore & {
      setToken: (token: IToken | null) => void;
    }
  >(
    (set) => ({
      state: null,
      setToken: (state: IToken | null) => {
        set({ state });
      },
    }),
    {
      name: 'auth',
    },
  ),
);
