import { useMemo } from 'react';
import { useGetLostFoundDetail } from '../_lib/get';
import type { LostType } from '@/model/LostFound';

type UseLostFoundDetailAdapter = (params: { lostId: string }) => {
  title: string;
  initialContent: string;
  subwayLineId: number;
  lostType: LostType;
  images: {
    id: number | null;
    data: File | null;
    url: string;
  }[];
};

const useLostFoundDetailAdapter: UseLostFoundDetailAdapter = ({ lostId }) => {
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

export default useLostFoundDetailAdapter;
