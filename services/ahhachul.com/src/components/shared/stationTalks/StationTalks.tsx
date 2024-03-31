import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { title } from './style';

const StationTalks: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{
        title: '건대입구역 이모저모',
      }}
      activeTab={false}
    >
      <main css={{ padding: '20px' }}>
        <h1 css={title}>건대입구역 이모저모</h1>
      </main>
    </Layout>
  );
};

export default StationTalks;
