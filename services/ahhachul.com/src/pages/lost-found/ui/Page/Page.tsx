import React from 'react';
import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout, Navbar } from 'widgets';

const Lost: ActivityComponentType = () => {
  const {
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: 'Lost' }} navigationSlot={<Navbar />}>
      <div css={{ color: text[50] }}>LostFound</div>
    </Layout>
  );
};

export default Lost;
