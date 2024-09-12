import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type IToken } from 'entities/app-authentications/model';

interface IAuthStore {
  state: Nullable<IToken>;
}

export const useAuthStore = create(
  persist<
    IAuthStore & {
      setToken: (token: Nullable<IToken>) => void;
    }
  >(
    (set) => ({
      state: null,
      setToken: (state: Nullable<IToken>) => {
        set({ state });
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
