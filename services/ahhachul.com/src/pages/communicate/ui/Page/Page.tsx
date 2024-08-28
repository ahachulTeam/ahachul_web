import React from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout, Navbar } from 'widgets';
import { renderLeft, renderRight } from 'widgets/layout-header';

const CommunityArticleList = React.lazy(
  () => import('../_common/CommunityArticleList/CommunityArticleList'),
);

const Community: ActivityComponentType = () => {
  return (
    <Layout appBar={{ renderLeft, renderRight }} navigationSlot={<Navbar />}>
      <CommunityArticleList />
    </Layout>
  );
};

export default Community;
