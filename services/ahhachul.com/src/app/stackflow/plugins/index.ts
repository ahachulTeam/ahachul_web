import { preloadPlugin } from '@stackflow/plugin-preload';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { queryClient } from 'app/lib/react-query';
import { loader as CommunityDetail } from 'pages/communicate/ui/Page/Detail';
import { PATH } from 'shared/lib/config/app-path';
import themes from 'shared/themes.css';

const stackflowPlugin = [
  basicRendererPlugin(),
  basicUIPlugin({
    theme: themes.selector,
    appBar: {
      height: themes.dimensions.size.height.header,
      borderColor: themes.color.background[50],
    },
  }),
  historySyncPlugin({
    routes: {
      Home: PATH.home,
      LostFound: PATH.lostFound.home,
      LostFoundDetail: PATH.lostFound.detail.home,
      CreateLostArticle: PATH.lostFound.create,
      Community: PATH.community.home,
      CommunityDetail: PATH.community.detail.home,
      CreateCommunityArticle: PATH.community.create,
      Complaint: PATH.complaints.home,
      ComplaintList: PATH.complaints.list,
      ComplaintDetail: PATH.complaints.detail.home,
      ComplaintForm: PATH.complaints.create,
      BlindDate: PATH.date.home,
      AllServices: PATH['_shared-pages'].allServices,
      SubwayNotices: PATH['_shared-pages'].subwayNotice,
      Market: PATH['_shared-pages'].market,
      CarSharing: PATH['_shared-pages'].carSharing,
    },
    fallbackActivity: () => 'Home',
  }),
  preloadPlugin({
    loaders: {
      CommunityDetail: CommunityDetail(queryClient),
    },
  }),
];
export { stackflowPlugin as plugins };
