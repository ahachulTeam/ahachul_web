import React from 'react';
// import { ActivityComponentType } from '@stackflow/react';

// import { Layout } from '@/src/components/layout';

type ChatProps = {
  slug: string;
};

const Chat: React.FC<ChatProps> = (params) => {
  console.log('params:', params);
  return (
    // <Layout
    //   appBar={{
    //     title: params.slug,
    //   }}
    //   activeTab={false}
    // >
    <div>Hello this is Chat Screen</div>
    // </Layout>
  );
};

export default Chat;
