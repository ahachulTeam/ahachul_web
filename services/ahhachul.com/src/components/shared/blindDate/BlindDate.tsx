import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { title } from './style';
import { useFlow } from 'stackflow';

const BlindDate: ActivityComponentType = () => {
  const { replace } = useFlow();
  return (
    <Layout
      appBar={{
        title: '소개팅',
      }}
      activeTab={false}
    >
      <main css={{ padding: '20px' }}>
        <h1 css={title}>this is Blind Date page</h1>
        <br />
        <br />
        <br />
        <button css={{ color: 'white', fontWeight: 700 }} onClick={() => replace('Home', {})}>
          go home
        </button>
      </main>
    </Layout>
  );
};

export default BlindDate;
