import React from 'react';
import { type ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { CommunityComponent, UiComponent } from 'components';
import SearchModal from 'components/community/modal/SearchModal';

const Community: ActivityComponentType = () => {
  return (
    <Layout activeTab={'Community'}>
      <CommunityComponent.CommunityMain />
      <UiComponent.OpacityModal>
        <SearchModal />
      </UiComponent.OpacityModal>
    </Layout>
  );
};

export default Community;
