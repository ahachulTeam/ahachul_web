import React from 'react';
import { Layout } from 'components/layout';
import { title } from './style';
import { ActivityComponentType } from '@stackflow/react';

const MyProfile: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{
        title: '마이 프로필',
      }}
      activeTab={false}
    >
      <main css={{ padding: '20px' }}>
        <h1 css={title}>this is MyProfile page</h1>
      </main>
    </Layout>
  );
};

export default MyProfile;
