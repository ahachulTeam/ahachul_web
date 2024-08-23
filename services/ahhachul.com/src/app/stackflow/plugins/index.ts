import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { defaultOptions } from './options';

const stackflowPlugin = [basicRendererPlugin(), basicUIPlugin(defaultOptions)];
export { stackflowPlugin as plugins };
