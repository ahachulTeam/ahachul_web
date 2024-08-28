// import { SharedComponent } from 'components';

import React from 'react';

const AllServices = React.lazy(
  () => import('pages/_shared-pages/all-services/ui/Page/Page'),
);
const SubwayNotices = React.lazy(
  () => import('pages/_shared-pages/subway-notices/ui/Page/Page'),
);
export const sharedLayers = {
  AllServices,
  SubwayNotices,
  // Chat: SharedComponent.Chat,
  // Alarm: SharedComponent.Alarm,
  // MyTicket: SharedComponent.MyTicket,
  // MyProfile: SharedComponent.MyProfile,
  // AllServices: SharedComponent.AllServices,
  // SubwayWarning: SharedComponent.SubwayWarning,
  // SubwayTimeTable: SharedComponent.SubwayTimeTable,
  // SubwayLineTalks: SharedComponent.SubwayLineTalks,
  // StationTalks: SharedComponent.StationTalks,
} as const;
