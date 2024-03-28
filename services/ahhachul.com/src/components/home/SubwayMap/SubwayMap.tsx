import React from 'react';
import { Layout } from 'components/layout';
import { UiComponent } from 'components';
import { wrap } from './style';

const SubwayMap = () => {
  return (
    <Layout
      appBar={{
        title: '나만의 역 등록',
      }}
      activeTab={false}
    >
      <main css={wrap}>
        <UiComponent.Editor />
      </main>
    </Layout>
  );
};

export default SubwayMap;
