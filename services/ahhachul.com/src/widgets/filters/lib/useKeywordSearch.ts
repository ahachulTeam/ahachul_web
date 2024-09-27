import { useMemo, useCallback } from 'react';
import { useStepFlow } from 'app/stackflow';
import type { AppUniqueFilterId } from '../model';

export const useKeywordSearch = (uniqueId: AppUniqueFilterId) => {
  const { stepPush } = useStepFlow(uniqueId);

  const updateKeyword = useCallback(
    (value: string) => {
      stepPush({
        keyword: value.trim(),
      });
    },
    [stepPush],
  );

  const resetKeyword = useCallback(() => {
    updateKeyword('');
  }, [updateKeyword]);

  return useMemo(
    () => ({
      updateKeyword,
      resetKeyword,
    }),
    [updateKeyword, resetKeyword],
  );
};
