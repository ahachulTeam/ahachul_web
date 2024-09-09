import React from 'react';

const Community = React.lazy(() => import('pages/communicate/ui/Page/Page'));
const CommunityDetail = React.lazy(
  () => import('pages/communicate/ui/Page/Detail'),
);
const CreateCommunityArticle = React.lazy(
  () => import('pages/communicate/ui/Page/Create'),
);
export const communityLayers = {
  Community,
  CommunityDetail,
  CreateCommunityArticle,
  // CommunityDetail,
  // CommunityEditor,
} as const;
