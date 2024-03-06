import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';

const Alarm: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{
        title: '알림',
      }}
      activeTab={false}
    >
      <div>Hello this is Alarm Screen</div>
    </Layout>
  );
};

export default Alarm;
