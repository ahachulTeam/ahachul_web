import { create } from 'zustand';

interface ILoadingStore {
  globalLoading: boolean;
}

export const useLoadingStore = create<
  ILoadingStore & {
    setEnableGlobalLoading: () => void;
    setDisableGlobalLoading: (opacity?: number) => void;
  }
>(set => ({
  globalLoading: false,
  setEnableGlobalLoading: () =>
    set(() => ({
      globalLoading: true,
    })),
  setDisableGlobalLoading: () =>
    set(() => ({
      globalLoading: false,
    })),
}));
