import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';

import { PATH } from '@/constants/path';

import { theme } from './styles';

export const stackflowPlugin = [
  basicRendererPlugin(),
  basicUIPlugin({
    theme: 'cupertino',
    appBar: {
      height: theme.size.header.height_m,
      borderSize: '0px',
    },
  }),
  historySyncPlugin({
    routes: {
      // sign-in pages
      SignInPage: PATH.auth.login,
      SignInCallbackPage: PATH.auth.callback,
      SetNickNamePage: PATH.auth.settings.nickname,

      // my pages
      MyPage: PATH.me.home,
      SettingPage: PATH.me.setting,
      MyAccountPage: PATH.me.account,
      DelayCenterPage: PATH.me.delayCenter,

      // home page
      HomePage: PATH.home,

      // lost-found pages
      LostFoundPage: PATH.lostFound.home,
      NewLostFoundPage: PATH.lostFound.new,
      EditLostFoundPage: PATH.lostFound.edit,
      LostFoundDetailPage: PATH.lostFound.detail,

      // community pages
      CommunityPage: PATH.community.home,
      CommunityStationPage: PATH.community.station,
      CommunityLinePage: PATH.community.line,
      NewCommunityPage: PATH.community.new,
      EditCommunityPage: PATH.community.edit,
      CommunityDetailPage: PATH.community.detail,

      // complaint pages
      ComplaintPage: PATH.complaint.home,
      ComplaintPanelPage: PATH.complaint.list,
      NewComplaintPage: PATH.complaint.new,
      EditComplaintPage: PATH.complaint.edit,
      ComplaintDetailPage: PATH.complaint.detail,

      // sharing pages
      TalkPage: PATH.talk.home,
      TalkDetailPage: PATH.talk.detail,
      TalkSettingPage: PATH.talk.setting,
      UserProfilePage: PATH.user.profile,
      UserProfileSettingPage: PATH.user.setting,
      UserProfilePreviewPage: PATH.user.preview,

      NotificationPage: PATH.notification.home,
      NotificationSettingPage: PATH.notification.setting,

      EditCommentPage: PATH.comment.edit,
      NewCommentReplyPage: PATH.comment.reply,

      NewsDetailPage: PATH.news.detail,

      HashtagPage: PATH.hashtag.home,

      SubwayMapPage: PATH.subway.map,
      SubwayTimelinePage: PATH.subway.timeline,
      DailyVotePage: PATH.dailyVote.detail,
      DelayProofPage: PATH.proof.detail,
      ForeignerHotspotsPage: PATH.foreigner.hotspots,
      ForeignerHotspotDetailPage: PATH.foreigner.hotspotDetail,
      ForeignerLanguageExchangePage: PATH.foreigner.languageExchange,
    },
    fallbackActivity: () => 'HomePage',
  }),
];
