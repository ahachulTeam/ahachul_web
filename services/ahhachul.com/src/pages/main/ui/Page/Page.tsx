import React from 'react';
import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { useFlow } from 'app/stackflow';
import { Layout, Navbar } from 'widgets';
import { renderLeft, renderRight } from 'widgets/layout-header';

const Home: ActivityComponentType = () => {
  const { push } = useFlow();
  const {
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ renderLeft, renderRight }} navigationSlot={<Navbar />}>
      <div css={{ color: text[50] }} onClick={() => push('SubwayNotices', {})}>
        hi
      </div>
    </Layout>
  );
};

export default Home;
