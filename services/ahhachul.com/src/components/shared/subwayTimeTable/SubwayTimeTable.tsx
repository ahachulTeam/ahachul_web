import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { title } from './style';

const SubwayTimeTable: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{
        title: '지하철 시간표',
      }}
      activeTab={false}
    >
      <main css={{ padding: '14px 20px' }}>
        <h1 css={title}>지하철 시간표</h1>
      </main>
    </Layout>
  );
};

export default SubwayTimeTable;
