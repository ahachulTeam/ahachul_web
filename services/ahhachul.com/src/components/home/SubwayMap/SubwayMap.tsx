import React from 'react';
import { Layout } from 'components/layout';
import { title, wrap } from './style';

const SubwayMap = () => {
  return (
    <Layout
      appBar={{
        title: '나만의 역 등록',
      }}
      activeTab={false}
    >
      <main css={wrap}>
        <h1 css={title}>this is 노선도 보기 page</h1>
      </main>
    </Layout>
  );
};

export default SubwayMap;
