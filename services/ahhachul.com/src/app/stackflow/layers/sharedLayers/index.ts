import React from 'react';

const AllServices = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */ 'pages/_shared-pages/all-services/ui/Page/Page'
    ),
);
const SubwayNotices = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */ 'pages/_shared-pages/subway-notices/ui/Page/Page'
    ),
);
const Market = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */ 'pages/_shared-pages/market/ui/Page/Page'
    ),
);
const CarSharing = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */ 'pages/_shared-pages/car-sharing/ui/Page/Page'
    ),
);

const CommentInner = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */ 'pages/_shared-pages/comment/ui/Page/Page'
    ),
);

export const sharedLayers = {
  AllServices,
  SubwayNotices,
  Market,
  CarSharing,
  CommentInner,
  // Chat: SharedComponent.Chat,
  // Alarm: SharedComponent.Alarm,
  // MyProfile: SharedComponent.MyProfile,
} as const;
