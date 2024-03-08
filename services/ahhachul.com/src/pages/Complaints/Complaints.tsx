import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { ComplaintsComponent } from 'components';

const Complaints: ActivityComponentType = () => {
  return (
    <Layout activeTab={'Complaints'} isDarkMode>
      <ComplaintsComponent.ComplaintsMain />
    </Layout>
  );
};

export default Complaints;
