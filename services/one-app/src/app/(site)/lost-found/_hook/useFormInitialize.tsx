import { useEffect } from 'react';
import type { LostFoundFormData } from '@/model/LostFound';

type Params = {
  lostFoundFormData: LostFoundFormData;
  initCallback: (params: LostFoundFormData) => void;
};

const useLostFoundFormInitialize = ({
  lostFoundFormData,
  initCallback,
}: Params) => {
  useEffect(() => {
    if (lostFoundFormData) {
      initCallback(lostFoundFormData);
    }
  }, [lostFoundFormData]);
};

export default useLostFoundFormInitialize;
