import { create } from 'zustand';

interface CountState {
  count: number;
  inc(): void;
}

export const useStore = create<CountState>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
