import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import type { CommentList } from '@/types';

interface TempCommentState {
  comment: CommentList['comments'] | null;
  setComment: (comment: CommentList['comments'] | null) => void;
  clearComment: () => void;
}

const useTempAuthStore = create<TempCommentState>(set => ({
  comment: null,
  setComment: comment => set({ comment }),
  clearComment: () => set({ comment: null }),
}));

export const useTempComment = () => {
  const tempComment = useTempAuthStore(useShallow(state => state.comment));
  const setTempComment = useTempAuthStore(useShallow(state => state.setComment));
  const clearTempComment = useTempAuthStore(useShallow(state => state.clearComment));

  return { tempComment, setTempComment, clearTempComment };
};
