import React from 'react';

const Community = React.lazy(() => import('pages/communicate/ui/Page/Page'));
const CommunityDetail = React.lazy(
  () => import('pages/communicate/ui/Page/Detail'),
);
export const communityLayers = {
  Community,
  CommunityDetail,
  // CommunityDetail,
  // CommunityEditor,
} as const;
