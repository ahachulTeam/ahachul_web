import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import theme from 'shared/themes.css';

import { Layout, Navbar } from 'widgets';
import { useFlow } from 'app/stackflow';

const Home: ActivityComponentType = () => {
  const t = theme;
  console.log('t :', t);

  const { push } = useFlow();

  return (
    <Layout navigationSlot={<Navbar />}>
      <div onClick={() => push('Community', {})}>hi</div>
    </Layout>
  );
};

export default Home;
