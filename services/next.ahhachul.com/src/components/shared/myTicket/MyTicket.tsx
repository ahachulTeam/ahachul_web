import React from 'react';
// import { ActivityComponentType } from '@stackflow/react';

// import { Layout } from '@/src/components/layout';
import { title } from './style';

const MyTicket = () => {
  return (
    // <Layout
    //   appBar={{
    //     title: '내 이용권',
    //   }}
    //   activeTab={false}
    // >
    <main css={{ padding: '20px' }}>
      <h1 css={title}>this is MyTicket page</h1>
    </main>
    // </Layout>
  );
};

export default MyTicket;
