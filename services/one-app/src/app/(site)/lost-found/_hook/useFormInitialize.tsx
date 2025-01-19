import { useEffect } from 'react';

import type { LostFoundFormData } from '@/model/LostFound';

type Params = {
  initialFormData: LostFoundFormData | null;
  initCallback: (params: LostFoundFormData) => void;
};

const useLostFoundFormInitialize = ({ initialFormData, initCallback }: Params) => {
  useEffect(() => {
    if (initialFormData) {
      initCallback(initialFormData);
    }
  }, [initialFormData]);
};

export default useLostFoundFormInitialize;
