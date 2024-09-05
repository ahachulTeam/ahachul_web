import { create } from 'zustand';

interface ILoadingStore {
  active: boolean;
  opacity: number;
}

const defaultOpacity = 0.5;

const useLoadingStore = create<
  ILoadingStore & {
    setLoaded: () => void;
    setLoading: (opacity?: number) => void;
  }
>((set) => ({
  active: false,
  opacity: defaultOpacity,
  setLoaded: () =>
    set(() => ({
      active: false,
      opacity: defaultOpacity,
    })),
  setLoading: (opacity = defaultOpacity) =>
    set(() => ({
      active: true,
      opacity,
    })),
}));

export default useLoadingStore;
