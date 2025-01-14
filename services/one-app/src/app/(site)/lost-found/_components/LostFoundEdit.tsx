'use client';

import LostFoundForm from './LostFoundForm';

import useFormAdapter from '../_hook/useFormAdapter';

const LostFoundEdit = ({ lostId }: { lostId: string }) => {
  const lostFoundFormData = useFormAdapter({
    lostId: Number(lostId),
  });
  return <LostFoundForm lostId={lostId} initialFormData={lostFoundFormData} />;
};

export default LostFoundEdit;
