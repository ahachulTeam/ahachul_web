import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type IToken } from 'entities/app-authentications/model';

interface IAuthStore {
  auth: Nullable<IToken>;
}

export const useAuthStore = create(
  persist<
    IAuthStore & {
      setToken: (token: Nullable<IToken>) => void;
    }
  >(
    (set) => ({
      auth: null,
      setToken: (auth: Nullable<IToken>) => {
        set({ auth });
      },
    }),
    {
      name: 'auth',
    },
  ),
);

interface ISocialLoginModalStore {
  active: boolean;
}

export const useSocialLoginModal = create<
  ISocialLoginModalStore & {
    setActiveToggle: (a: boolean) => void;
  }
>((set) => ({
  active: false,
  setActiveToggle: (active: boolean) =>
    set(() => ({
      active,
    })),
}));

interface TemporaryAuthState {
  auth: Nullable<IToken>;
  setTempAuth: (authData: IToken) => void;
  reset: () => void;
}

export const useTemporaryAuthStore = create<TemporaryAuthState>((set) => ({
  auth: null,
  setTempAuth: (authData: IToken) => set({ auth: authData }),
  reset: () => set({ auth: null }),
}));
