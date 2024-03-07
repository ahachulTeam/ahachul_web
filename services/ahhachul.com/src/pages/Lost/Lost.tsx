import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { LostComponent } from 'components';

const Lost: ActivityComponentType = () => {
  return (
    <Layout activeTab={'Lost'}>
      <LostComponent.LostMain />
    </Layout>
  );
};

export default Lost;
