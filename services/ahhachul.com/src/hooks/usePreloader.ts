import { createPreloader } from '@stackflow/plugin-preload';

import type { TypeActivities } from '@/stackflow';

export const { usePreloader } = createPreloader<TypeActivities>();
