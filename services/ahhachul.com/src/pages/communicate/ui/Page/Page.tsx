import React from 'react';
import { useTheme } from '@emotion/react';
import { type ActivityComponentType } from '@stackflow/react';
import { Layout, Navbar } from 'widgets';

const Community: ActivityComponentType = () => {
  const {
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: 'Community' }} navigationSlot={<Navbar />}>
      <div css={{ color: text[50] }}>Community</div>
    </Layout>
  );
};

export default Community;
