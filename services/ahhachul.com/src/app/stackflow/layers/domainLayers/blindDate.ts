import React from 'react';

const BlindDate = React.lazy(
  () => import(/* webpackPrefetch: true */ 'pages/blind-date/ui/Page/Page'),
);
export const blindDateLayers = {
  BlindDate,
  // BlindDateForm: BlindDateComponent.FormForBlindDate,
  // BlindDateMyPage: BlindDateComponent.BlindDateMyPage,
} as const;
