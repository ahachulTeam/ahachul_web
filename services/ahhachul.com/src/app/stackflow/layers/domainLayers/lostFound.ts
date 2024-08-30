import React from 'react';

const LostFound = React.lazy(() => import('pages/lost-found/ui/Page/Page'));
const LostFoundDetail = React.lazy(
  () => import('pages/lost-found/ui/Page/Detail'),
);
export const lostLayers = {
  LostFound,
  LostFoundDetail,
  // LostDetail,
  // LostEditor,
};
