import { stackflow } from '@stackflow/react';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { createLinkComponent } from '@stackflow/link';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';

import {
  Home,
  Complaints,
  ComplaintDetail,
  Lost,
  LostDetail,
  LostEditor,
  Community,
  CommunityDetail,
  CommunityEditor,
} from 'pages';
import { ComplaintsComponent, HomeComponent, SharedComponent } from 'components';
import { PATH } from 'data';

export const { Stack, activities, useFlow, useStepFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    Chat: SharedComponent.Chat,
    Alarm: SharedComponent.Alarm,
    MyTicket: SharedComponent.MyTicket,
    MyProfile: SharedComponent.MyProfile,
    BlindDate: SharedComponent.BlindDate,
    AllServices: SharedComponent.AllServices,
    SubwayWarning: SharedComponent.SubwayWarning,
    SubwayTimeTable: SharedComponent.SubwayTimeTable,
    SubwayLineTalks: SharedComponent.SubwayLineTalks,
    StationTalks: SharedComponent.StationTalks,
    Home,
    SubwayMap: HomeComponent.SubwayMap,
    RegisterCenter: HomeComponent.RegisterCenter,
    AskTrainNumber: ComplaintsComponent.AskTrainNumber,
    ComplaintsSubmission: ComplaintsComponent.ComplaintsSubmission,
    Complaints,
    ComplaintDetail,
    Lost,
    LostDetail,
    LostEditor,
    Community,
    CommunityDetail,
    CommunityEditor,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
      appBar: {
        height: '58px',
        borderSize: '0',
        borderColor: 'white',
      },
    }),
    historySyncPlugin({
      routes: {
        Home: PATH.home,
        Chat: PATH.chat,
        Alarm: PATH.alarm,
        MyTicket: PATH.myTicket,
        MyProfile: PATH.me,
        BlindDate: PATH.blindDate,
        AllServices: PATH.allServices,
        SubwayWarning: PATH.subwayWarning,
        SubwayTimeTable: PATH.subwayTimeTable,
        SubwayLineTalks: PATH.subwayLineTalks,
        StationTalks: PATH.stationTalks,
        SubwayMap: PATH.subwayMap,
        RegisterCenter: PATH.registerCenter,
        Complaints: PATH.complaints,
        ComplaintDetail: PATH.complaintDetail,
        AskTrainNumber: PATH.complaintsAskTrainNumber,
        ComplaintsSubmission: PATH.complaintsSubmission,
        Lost: PATH.lost,
        LostDetail: PATH.lostDetail,
        LostEditor: PATH.lostEditor,
        Community: PATH.community,
        CommunityDetail: PATH.communityDetail,
        CommunityEditor: PATH.communityEditor,
      },
      fallbackActivity: () => 'Home',
    }),
  ],
});

export type TypeActivities = typeof activities;

export const { Link } = createLinkComponent<TypeActivities>();
