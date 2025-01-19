import { useMemo } from 'react';
<<<<<<< HEAD

import type { LostFoundFormData } from '@/model/LostFound';

import { useGetLostFoundDetail } from '../_lib/get';

type UseLostFoundFormAdapter = ({ lostId }: { lostId: number }) => LostFoundFormData;
=======
import { useGetLostFoundDetail } from '../_lib/get';
import type { LostFoundFormData } from '@/model/LostFound';

type UseLostFoundFormAdapter = ({
  lostId,
}: {
  lostId: number;
}) => LostFoundFormData;
>>>>>>> main

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
<<<<<<< HEAD
        data.images.map(image => ({
=======
        data.images.map((image) => ({
>>>>>>> main
          id: image.imageId ?? null,
          data: null,
          url: image.imageUrl,
        })) ?? [],
    };
  }, [data]);

  return result;
};

export default useLostFoundFormAdapter;
