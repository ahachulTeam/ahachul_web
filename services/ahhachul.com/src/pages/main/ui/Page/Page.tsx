import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'widgets';
import theme from 'shared/themes.css';
import { useFlow } from 'app/stackflow';

const Home: ActivityComponentType = () => {
  const t = theme;
  console.log('t :', t);

  const { push } = useFlow();

  return (
    <Layout>
      <div onClick={() => push('Community', {})}>hi</div>
    </Layout>
  );
};

export default Home;
