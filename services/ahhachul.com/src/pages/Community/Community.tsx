import React from 'react';
import { type ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { CommunityComponent, UiComponent } from 'components';

const Community: ActivityComponentType = () => {
  return (
    <Layout activeTab={'Community'} hasSearch>
      <CommunityComponent.CommunityMain />
      <UiComponent.SearchModal>
        <UiComponent.SearchBase />
        <UiComponent.SearchList />
      </UiComponent.SearchModal>
    </Layout>
  );
};

export default Community;
