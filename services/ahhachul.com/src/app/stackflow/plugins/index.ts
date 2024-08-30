import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { preloadPlugin } from '@stackflow/plugin-preload';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
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
      Community: PATH.community.home,
      CommunityDetail: PATH.community.detail.home,
      Complaint: PATH.complaints.home,
      ComplaintDetail: PATH.complaints.detail.home,
      BlindDate: PATH.date.home,
      AllServices: PATH['_shared-pages'].allServices,
      SubwayNotices: PATH['_shared-pages'].subwayNotice,
      Market: PATH['_shared-pages'].market,
      CarSharing: PATH['_shared-pages'].carSharing,
    },
    fallbackActivity: () => 'Home',
  }),
  preloadPlugin({
    loaders: {},
  }),
];
export { stackflowPlugin as plugins };
