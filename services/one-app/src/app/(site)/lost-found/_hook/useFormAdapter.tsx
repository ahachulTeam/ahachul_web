import { useMemo } from 'react';
import { useGetLostFoundDetail } from '../_lib/get';
import type { LostFoundFormData } from '@/model/LostFound';

type UseLostFoundFormAdapter = ({
  lostId,
}: {
  lostId: string;
}) => LostFoundFormData;

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
        data.images.map((image) => ({
          id: image.imageId ?? null,
          data: null,
          url: image.imageUrl,
        })) ?? [],
    };
  }, [data]);

  return result;
};

export default useLostFoundFormAdapter;
