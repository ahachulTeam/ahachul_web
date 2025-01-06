'use client';

import useFormAdapter from '../_hook/useFormAdapter';
import LostFoundForm from './LostFoundForm';

const LostFoundEdit = ({ lostId }: { lostId: string }) => {
  const lostFoundFormData = useFormAdapter({
    lostId: Number(lostId),
  });
  return <LostFoundForm lostId={lostId} initialFormData={lostFoundFormData} />;
};

export default LostFoundEdit;
