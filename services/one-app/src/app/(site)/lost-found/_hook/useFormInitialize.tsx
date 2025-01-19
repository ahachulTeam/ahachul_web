import { useEffect } from 'react';
<<<<<<< HEAD

=======
>>>>>>> develop
import type { LostFoundFormData } from '@/model/LostFound';

type Params = {
  initialFormData: LostFoundFormData | null;
  initCallback: (params: LostFoundFormData) => void;
};

<<<<<<< HEAD
const useLostFoundFormInitialize = ({ initialFormData, initCallback }: Params) => {
=======
const useLostFoundFormInitialize = ({
  initialFormData,
  initCallback,
}: Params) => {
>>>>>>> develop
  useEffect(() => {
    if (initialFormData) {
      initCallback(initialFormData);
    }
  }, [initialFormData]);
};

export default useLostFoundFormInitialize;
