import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
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
      LostFound: PATH.lost.home,
      Community: PATH.community.home,
      Complaint: PATH.complaints.home,
      BlindDate: PATH.date.home,
      SubwayNotices: PATH['_shared-pages'].subwayNotice,
    },
    fallbackActivity: () => 'Home',
  }),
];
export { stackflowPlugin as plugins };
