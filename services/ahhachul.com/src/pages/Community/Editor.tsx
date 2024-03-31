import React from 'react';
import { Layout } from 'components/layout';
import { UiComponent } from 'components';
import { f } from 'styles';

const CommunityEditor = () => {
  return (
    <Layout
      appBar={{
        title: '글 작성',
      }}
      activeTab={false}
    >
      <main css={wrap}>
        <UiComponent.Editor />
      </main>
    </Layout>
  );
};

const wrap = [f.fullWidth, f.flexColumn, { padding: '26px 20px 48px 20px' }];

export default CommunityEditor;
