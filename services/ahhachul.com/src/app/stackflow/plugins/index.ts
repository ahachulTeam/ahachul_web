import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { theme } from 'shared/style';

const defaultOptions = {
  theme: 'cupertino',
  appBar: {
    borderSize: '0',
    height: theme.dimensions.size.height.header,
  },
} as const;
const stackflowPlugin = [basicRendererPlugin(), basicUIPlugin(defaultOptions)];
export { stackflowPlugin as plugins };
