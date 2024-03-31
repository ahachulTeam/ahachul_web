import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { title } from './style';

const AllServices: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{
        title: '전체 서비스',
      }}
      activeTab={false}
    >
      <main css={{ padding: '20px' }}>
        <h1 css={title}>this is All Services page</h1>
      </main>
    </Layout>
  );
};

export default AllServices;
