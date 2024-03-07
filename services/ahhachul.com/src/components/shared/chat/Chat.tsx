import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';

const Chat: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{
        title: '채팅 목록',
      }}
      activeTab={false}
    >
      <div>Hello this is Chat Screen</div>
    </Layout>
  );
};

export default Chat;
