import { stackflow } from '@stackflow/react';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { createLinkComponent } from '@stackflow/link';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';

import { Complaints, Home, Lost, Community } from 'pages';
import { ComplaintsComponent, HomeComponent, SharedComponent } from 'components';
import { PATH } from 'data';

export const { Stack, activities, useFlow, useStepFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    Chat: SharedComponent.Chat,
    Alarm: SharedComponent.Alarm,
    MyTicket: SharedComponent.MyTicket,
    MyProfile: SharedComponent.MyProfile,
    LostDetail: SharedComponent.LostDetail,
    CommunityDetail: SharedComponent.CommunityDetail,
    Home,
    SubwayMap: HomeComponent.SubwayMap,
    RegisterCenter: HomeComponent.RegisterCenter,
    Complaints,
    AskTrainNumber: ComplaintsComponent.AskTrainNumber,
    ComplaintsSubmission: ComplaintsComponent.ComplaintsSubmission,
    ComplaintsComplete: ComplaintsComponent.ComplaintsComplete,
    Lost,
    Community,
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
        SubwayMap: PATH.subwayMap,
        RegisterCenter: PATH.registerCenter,
        Complaints: PATH.complaints,
        AskTrainNumber: PATH.complaintsAskTrainNumber,
        ComplaintsSubmission: PATH.complaintsSubmission,
        ComplaintsComplete: PATH.complaintsComplete,
        Lost: PATH.lost,
        LostDetail: PATH.lostDetail,
        Community: PATH.community,
        CommunityDetail: PATH.communityDetail,
      },
      fallbackActivity: () => 'Home',
    }),
  ],
});

export type TypeActivities = typeof activities;

export const { Link } = createLinkComponent<TypeActivities>();
