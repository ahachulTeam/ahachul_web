import { useMemo } from 'react';

import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { useGetCommunityDetail } from 'queries/community/useGetCommunityDetail';

type CommunityDetailMainProps = {
  postId: string;
};

const CommunityDetailMain = ({ postId }: CommunityDetailMainProps) => {
  const { data } = useGetCommunityDetail(postId);
  const hasImage = useMemo(() => Boolean(data?.images?.length > 0), [data]);

  return <main>{hasImage ? <DetailWithImage data={data} /> : <DetailOnlyText data={data} />}</main>;
};

export default CommunityDetailMain;
