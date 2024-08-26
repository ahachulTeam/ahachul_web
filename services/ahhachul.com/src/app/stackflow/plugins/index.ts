import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { PATH } from 'shared/lib/config/app-path';
import themes from 'shared/themes.css';

const defaultOptions = {
  theme: 'cupertino',
  appBar: {
    borderColor: themes.color.background[50],
    height: themes.dimensions.size.height.header,
  },
} as const;
const stackflowPlugin = [
  basicRendererPlugin(),
  basicUIPlugin(defaultOptions),
  historySyncPlugin({ routes: { Home: PATH.home, Community: PATH.community.home }, fallbackActivity: () => 'Home' }),
];
export { stackflowPlugin as plugins };
