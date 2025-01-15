import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
// import { preloadPlugin } from '@stackflow/plugin-preload';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';

import { PATH } from '@/data/path';

export const stackflowPlugin = [
  basicRendererPlugin(),
  basicUIPlugin({
    rootClassName: 'ahhachul',
    theme: 'cupertino',
    // appBar: {
    //   height: themes.dimensions.size.height.header,
    //   borderColor: themes.color.background[50],
    // },
  }),
  historySyncPlugin({
    routes: {
      // sign-in pages
      LoginPage: PATH.auth.login,
      OAuthCallbackPage: PATH.auth.callback,
      SetNamePage: PATH.auth.settings.nickname,

      // my pages
      MyPage: PATH.me.home,

      // home page
      HomePage: PATH.home,

      // lost-found pages
      LostFoundPage: PATH.lostFound.home,
      NewLostFoundPage: PATH.lostFound.new,
      EditLostFoundPage: PATH.lostFound.edit,
      LostFoundDetailPage: PATH.lostFound.detail,

      // community pages
      CommunityPage: PATH.community.home,
      NewCommunityPage: PATH.community.new,
      EditCommunityPage: PATH.community.edit,
      CommunityDetailPage: PATH.community.detail,

      // complaint pages
      ComplaintPage: PATH.complaint.home,
      ComplaintListPage: PATH.complaint.list,
      NewComplaintPage: PATH.complaint.new,
      EditComplaintPage: PATH.complaint.edit,
      ComplaintDetailPage: PATH.complaint.detail,

      // sharing pages
      TalkPage: PATH.talk.home,
      TalkDetailPage: PATH.talk.detail,
      TalkSettingPage: PATH.talk.setting,

      NotificationPage: PATH.notification.home,
      NotificationSettingPage: PATH.notification.setting,

      EditCommentPage: PATH.comment.edit,
      NewCommentReplyPage: PATH.comment.reply,
    },
    fallbackActivity: () => 'HomePage',
  }),
  // preloadPlugin({
  //   loaders: {
  //     CommunityDetail: CommunityDetail(queryClient),
  //   },
  // }),
];
