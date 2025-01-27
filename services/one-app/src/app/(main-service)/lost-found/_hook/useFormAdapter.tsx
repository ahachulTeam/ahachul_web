import { useMemo } from 'react';

import type { LostFoundFormData } from '@/model';

import { useGetLostFoundDetail } from '../_lib/get';

type UseLostFoundFormAdapter = ({ lostId }: { lostId: number }) => LostFoundFormData;

const DEFAULT_DATA: LostFoundFormData = {
  title: '',
  initialContent: '',
  subwayLineId: 1,
  lostType: 'LOST' as LostFoundFormData['lostType'],
  images: [],
} as const;

const useLostFoundFormAdapter: UseLostFoundFormAdapter = ({ lostId }) => {
  const { data } = useGetLostFoundDetail(lostId);

  const result = useMemo(() => {
    if (!data) {
      return DEFAULT_DATA;
    }

    return {
      title: data.title ?? '',
      initialContent: data.content ?? '',
      subwayLineId: data.subwayLineId ?? 1,
      lostType: data.lostType ?? 'LOST',
      images:
        data.images.map(image => ({
          id: image.imageId ?? null,
          data: null,
          url: image.imageUrl,
        })) ?? [],
    };
  }, [data]);

  return result;
};

export default useLostFoundFormAdapter;
