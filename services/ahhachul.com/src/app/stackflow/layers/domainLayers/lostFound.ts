import React from 'react';

const LostFound = React.lazy(() => import('pages/lost-found/ui/Page/Page'));
const LostFoundDetail = React.lazy(
  () => import('pages/lost-found/ui/Page/Detail'),
);
const CreateLostArticle = React.lazy(
  () => import('pages/lost-found//ui/Page/Create'),
);
export const lostLayers = {
  LostFound,
  LostFoundDetail,
  CreateLostArticle,
  // LostDetail,
  // LostEditor,
};
