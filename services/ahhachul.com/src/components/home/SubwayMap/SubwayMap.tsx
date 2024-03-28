import React from 'react';
import { Layout } from 'components/layout';

import CommunityEditor from 'components/community/Editor';

const SubwayMap = () => {
  return (
    <Layout
      appBar={{
        title: '나만의 역 등록',
      }}
      activeTab={false}
    >
      <main>
        <CommunityEditor />
      </main>
    </Layout>
  );
};

export default SubwayMap;
