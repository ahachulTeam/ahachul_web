import React from 'react';

const Community = React.lazy(() => import('pages/communicate/ui/Page/Page'));
export const communityLayers = {
  Community,
  // CommunityDetail,
  // CommunityEditor,
} as const;
