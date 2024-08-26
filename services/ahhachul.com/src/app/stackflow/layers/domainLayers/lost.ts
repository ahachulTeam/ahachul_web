import React from 'react';

const LostFound = React.lazy(() => import('pages/lost-found/ui/Page/Page'));
export const lostLayers = {
  LostFound,
  // LostDetail,
  // LostEditor,
};
