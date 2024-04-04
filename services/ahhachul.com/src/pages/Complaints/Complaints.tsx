import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { ComplaintsComponent } from 'components';

const Complaints: ActivityComponentType = () => {
  return (
    <Layout activeTab={'Complaints'}>
      <ComplaintsComponent.ComplaintViewToggle />
      <ComplaintsComponent.ComplaintsMain />
      <ComplaintsComponent.ComplaintList />
    </Layout>
  );
};

export default Complaints;
