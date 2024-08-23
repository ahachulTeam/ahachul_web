import { stackflow } from '@stackflow/react';
import { createLinkComponent } from '@stackflow/link';

import { plugins } from './plugins';
import { sharedLayers, homeLayers, lostLayers, communityLayers, complaintLayers, blindDateLayers } from './layers';

type TypeActivities = typeof activities;

const { Link } = createLinkComponent<TypeActivities>();
const { Stack, activities, useFlow, useStepFlow } = stackflow({
  activities: {
    // 도메인 레이어
    ...homeLayers,
    ...lostLayers,
    ...communityLayers,
    ...complaintLayers,
    ...blindDateLayers,

    // 공용 레이어
    ...sharedLayers,
  },
  plugins,
  transitionDuration: 350,
});

export * from '@stackflow/react';
export { Stack, activities, useFlow, useStepFlow, Link, type TypeActivities };
