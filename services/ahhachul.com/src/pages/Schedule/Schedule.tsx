import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { ScheduleComponent } from 'components';

const Schedule: ActivityComponentType = () => {
  return (
    <Layout activeTab={'Schedule'}>
      <ScheduleComponent.ScheduleMain />
    </Layout>
  );
};

export default Schedule;
