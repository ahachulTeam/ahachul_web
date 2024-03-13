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
    Home,
    Chat: SharedComponent.Chat,
    Alarm: SharedComponent.Alarm,
    MyTicket: SharedComponent.MyTicket,
    MyProfile: SharedComponent.MyProfile,
    PurchaseTicket: HomeComponent.PurchaseTicket,
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
        RegisterCenter: PATH.registerCenter,
        Complaints: PATH.complaints,
        AskTrainNumber: PATH.complaintsAskTrainNumber,
        ComplaintsSubmission: PATH.complaintsSubmission,
        ComplaintsComplete: PATH.complaintsComplete,
        Lost: PATH.lost,
        Community: PATH.community,
      },
      fallbackActivity: () => 'Home',
    }),
  ],
});

export type TypeActivities = typeof activities;

export const { Link } = createLinkComponent<TypeActivities>();
