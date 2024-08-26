import React from 'react';
import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { useFlow } from 'app/stackflow';
import { Layout, Navbar } from 'widgets';

const Home: ActivityComponentType = () => {
  const { push } = useFlow();
  const {
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: 'Home' }} navigationSlot={<Navbar />}>
      <div css={{ color: text[50] }} onClick={() => push('Community', {})}>
        hi
      </div>
    </Layout>
  );
};

export default Home;
