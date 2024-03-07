import React from 'react';
import { Layout } from 'components/layout';
import { title } from './style';

const RegisterCenter = () => {
  return (
    <Layout
      appBar={{
        title: '센터 등록',
      }}
      activeTab={false}
    >
      <main css={{ padding: '20px' }}>
        <h1 css={title}>this is 센터 등록 page</h1>
      </main>
    </Layout>
  );
};

export default RegisterCenter;
