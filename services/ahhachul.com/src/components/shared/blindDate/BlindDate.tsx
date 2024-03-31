import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { title } from './style';

const BlindDate: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{
        title: '소개팅',
      }}
      activeTab={false}
    >
      <main css={{ padding: '20px' }}>
        <h1 css={title}>this is Blind Date page</h1>
      </main>
    </Layout>
  );
};

export default BlindDate;
