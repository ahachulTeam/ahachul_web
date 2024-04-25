import React from 'react';
import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { useGetCommunityDetail } from '@/src/queries/community/useGetCommunityDetail';

type CommunityDetailMainProps = {
  postId: string;
};

const CommunityDetailMain = ({ postId }: CommunityDetailMainProps) => {
  const { data } = useGetCommunityDetail(postId);

  return <article>{data.hasImage ? <DetailWithImage data={data} /> : <DetailOnlyText data={data} />}</article>;
};

export default CommunityDetailMain;
