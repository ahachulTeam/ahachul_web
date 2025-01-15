import { useStepFlow } from 'app/stackflow';

import type { AppUniqueFilterId } from '../model';

export const useKeywordSearch = (uniqueId: AppUniqueFilterId) => {
  const { stepPush } = useStepFlow(uniqueId);

  const updateKeyword = (value: string) => {
    stepPush({
      keyword: value.trim(),
    });
  };

  const resetKeyword = () => {
    updateKeyword('');
  };

  return {
    updateKeyword,
    resetKeyword,
  };
};
