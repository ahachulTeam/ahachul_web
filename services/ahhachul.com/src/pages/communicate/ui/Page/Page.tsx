import React from 'react';
import { type ActivityComponentType } from '@stackflow/react';
import { Layout, Navbar } from 'widgets';

const Community: ActivityComponentType = () => {
  return (
    <Layout navigationSlot={<Navbar />}>
      <div>Community</div>
      {/* <CommunityComponent.CommunityMain /> */}
      {/* <UiComponent.SearchModal>
        <UiComponent.SearchBase />
      </UiComponent.SearchModal> */}
    </Layout>
  );
};

export default Community;
