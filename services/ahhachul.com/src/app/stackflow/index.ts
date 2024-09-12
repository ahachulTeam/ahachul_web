import { stackflow } from '@stackflow/react';
import { createLinkComponent } from '@stackflow/link';
import { createPreloader } from '@stackflow/plugin-preload';
import { plugins } from './plugins';
import {
  homeLayers,
  lostLayers,
  communityLayers,
  complaintLayers,
  blindDateLayers,
  sharedLayers,
  signInLayers,
} from './layers';

import '@stackflow/plugin-basic-ui/index.css';

type TypeActivities = typeof activities;

const { Link } = createLinkComponent<TypeActivities>();
const { usePreloader } = createPreloader<TypeActivities>();
const { Stack, activities, useFlow, useStepFlow } = stackflow({
  activities: {
    // 로그인 레이어
    ...signInLayers,

    // 공용 레이어
    ...sharedLayers,

    // 도메인 레이어
    ...homeLayers,
    ...lostLayers,
    ...communityLayers,
    ...complaintLayers,
    ...blindDateLayers,
  },
  plugins,
  transitionDuration: 350,
});

export * from '@stackflow/react';
export {
  Stack,
  activities,
  useFlow,
  useStepFlow,
  usePreloader,
  Link,
  type TypeActivities,
};
