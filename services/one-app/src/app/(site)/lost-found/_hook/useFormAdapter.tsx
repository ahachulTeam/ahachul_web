import { useMemo } from 'react';
import { useGetLostFoundDetail } from '../_lib/get';
import type { LostType, LostFoundFormData } from '@/model/LostFound';

type UseLostFoundFormAdapter = (params: {
  lostId: string;
}) => LostFoundFormData;

const useLostFoundFormAdapter: UseLostFoundFormAdapter = ({ lostId }) => {
  const { data } = useGetLostFoundDetail(lostId);

  const result = useMemo(
    () => ({
      title: data?.title ?? '',
      initialContent: data?.content ?? '',
      subwayLineId: data?.subwayLineId ?? 1,
      lostType: data?.lostType ?? 'LOST',
      images:
        data?.images.map((image) => ({
          id: image.imageId ?? null,
          data: null,
          url: image.imageUrl,
        })) ?? [],
    }),
    [data],
  );
  return result;
};

export default useLostFoundFormAdapter;
