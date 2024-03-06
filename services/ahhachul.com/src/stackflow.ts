import { stackflow } from '@stackflow/react';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { createLinkComponent } from '@stackflow/link';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';

import { BPay, Home, Reservation, Community, Schedule } from 'pages';
import { HomeComponent, SharedComponent } from 'components';
import { PATH } from 'data';

export const { Stack, activities, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    Home,
    Alarm: SharedComponent.Alarm,
    MyTicket: SharedComponent.MyTicket,
    MyProfile: SharedComponent.MyProfile,
    PurchaseTicket: HomeComponent.PurchaseTicket,
    RegisterCenter: HomeComponent.RegisterCenter,
    BPay,
    Reservation,
    Community,
    Schedule,
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
        Alarm: PATH.alarm,
        MyTicket: PATH.myTicket,
        MyProfile: PATH.me,
        RegisterCenter: PATH.registerCenter,
        BPay: PATH.bpay,
        Reservation: PATH.reservation,
        Community: PATH.community,
        Schedule: PATH.schedule,
      },
      fallbackActivity: () => 'Home',
    }),
  ],
});

export type TypeActivities = typeof activities;

export const { Link } = createLinkComponent<TypeActivities>();
