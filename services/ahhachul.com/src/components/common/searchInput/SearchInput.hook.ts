import { useStepFlow } from '@/stackflow';
import { AppUniqueFilterId } from '@/types/filter';

const useSearchInput = (uniqueId: AppUniqueFilterId) => {
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

export default useSearchInput;
