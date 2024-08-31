import React from 'react';
import { Layout } from '@/src/components/layout';
import { title } from './style';

const RegisterCenter = () => {
  return (
    <Layout title="나만의 역 등록">
      <main css={{ padding: '20px' }}>
        <h1 css={title}>this is 나만의 역 등록 page</h1>
      </main>
    </Layout>
  );
};

export default RegisterCenter;
