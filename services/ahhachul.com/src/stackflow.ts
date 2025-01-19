import { createLinkComponent } from '@stackflow/link';
import '@stackflow/plugin-basic-ui/index.css';
import { createPreloader } from '@stackflow/plugin-preload';
import { stackflow } from '@stackflow/react';
import { useActivity } from '@stackflow/react';

import {
  MyPages,
  AuthPages,
  HomePages,
  CommunityPages,
  LostFoundPages,
  ComplaintPages,
  SharingPages,
} from '@/pages';

import { stackflowPlugin } from './stackflow.config';

const { Link } = createLinkComponent<TypeActivities>();

const { usePreloader } = createPreloader<TypeActivities>();

const {
  activities,
  Stack: Routes,
  useFlow,
  useStepFlow,
} = stackflow({
  activities: {
    ...MyPages,
    ...AuthPages,
    ...HomePages,
    ...CommunityPages,
    ...LostFoundPages,
    ...ComplaintPages,
    ...SharingPages,
  },
  plugins: stackflowPlugin,
  transitionDuration: 350,
});

export type TypeActivities = typeof activities;

export const StackFlow = {
  Link,
  Routes,
};

export { activities, useFlow, useStepFlow, usePreloader, useActivity };
