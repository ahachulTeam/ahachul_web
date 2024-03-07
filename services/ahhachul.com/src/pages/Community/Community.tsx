import React from 'react';
import { type ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { CommunityComponent } from 'components';

const Community: ActivityComponentType = () => {
  return (
    <Layout activeTab={'Community'}>
      <CommunityComponent.CommunityMain />
    </Layout>
  );
};

export default Community;
