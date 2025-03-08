import React from 'react';

import { createLinkComponent } from '@stackflow/link';
import '@stackflow/plugin-basic-ui/index.css';
import { createPreloader } from '@stackflow/plugin-preload';
import { stackflow } from '@stackflow/react';
import { useActivity } from '@stackflow/react';

import { stackflowPlugin } from './stackflow.config';

const HomePage = React.lazy(() => import('@/pages/home/page'));

const SignInPage = React.lazy(() => import('@/pages/auth/login'));
const CommunityPage = React.lazy(() => import('@/pages/community/page'));
const LostFoundPage = React.lazy(() => import('@/pages/lostFound/page'));
const ComplaintPage = React.lazy(() => import('@/pages/complaint/page'));
const TalkPage = React.lazy(() => import('@/pages/talk/page'));
const NotificationPage = React.lazy(() => import('@/pages/notification/page'));

const MyPage = React.lazy(() => import('@/pages/my/page'));
const SettingPage = React.lazy(() => import('@/pages/my/setting'));
const SetNickNamePage = React.lazy(() => import('@/pages/auth/set-nickname'));
const SignInCallbackPage = React.lazy(() => import('@/pages/auth/callback'));

const NewCommunityPage = React.lazy(() => import('@/pages/community/new'));
const EditCommunityPage = React.lazy(() => import('@/pages/community/[id]/edit'));
const CommunityDetailPage = React.lazy(() => import('@/pages/community/[id]/page'));

const NewLostFoundPage = React.lazy(() => import('@/pages/lostFound/new'));
const EditLostFoundPage = React.lazy(() => import('@/pages/lostFound/[id]/edit'));
const LostFoundDetailPage = React.lazy(() => import('@/pages/lostFound/[id]/page'));

const NewComplaintPage = React.lazy(() => import('@/pages/complaint/new'));
const ComplaintListPage = React.lazy(() => import('@/pages/complaint/list'));
const EditComplaintPage = React.lazy(() => import('@/pages/complaint/[id]/edit'));
const ComplaintDetailPage = React.lazy(() => import('@/pages/complaint/[id]/page'));

const TalkDetailPage = React.lazy(() => import('@/pages/talk/setting'));
const TalkSettingPage = React.lazy(() => import('@/pages/talk/[talkId]/page'));
const NotificationSettingPage = React.lazy(() => import('@/pages/notification/setting'));
const EditCommentPage = React.lazy(() => import('@/pages/comment/[commentId]/edit'));
const NewCommentReplyPage = React.lazy(() => import('@/pages/comment/[commentId]/reply'));

const { Link } = createLinkComponent<TypeActivities>();

const { usePreloader } = createPreloader<TypeActivities>();

const {
  activities,
  Stack: Routes,
  useFlow,
  useStepFlow,
} = stackflow({
  activities: {
    MyPage,
    SettingPage,
    SignInPage,
    SetNickNamePage,
    SignInCallbackPage,
    HomePage,
    CommunityPage,
    NewCommunityPage,
    EditCommunityPage,
    CommunityDetailPage,
    LostFoundPage,
    NewLostFoundPage,
    EditLostFoundPage,
    LostFoundDetailPage,
    ComplaintPage,
    NewComplaintPage,
    ComplaintListPage,
    EditComplaintPage,
    ComplaintDetailPage,
    TalkPage,
    TalkDetailPage,
    TalkSettingPage,
    NotificationPage,
    NotificationSettingPage,
    EditCommentPage,
    NewCommentReplyPage,
  },
  plugins: stackflowPlugin,
  transitionDuration: 350,
});

export type TypeActivities = typeof activities;

export const StackFlow = {
  Link,
  Routes,
};

export { activities, useFlow, useStepFlow, usePreloader, useActivity };
