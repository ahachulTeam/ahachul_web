import { create } from 'zustand';

/**
 * This is Mock interface & Function for creating
 */
interface CountState {
  count: number;
  inc(): void;
}

export const useStore = create<CountState>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
