import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { HomeComponent, UiComponent } from 'components';
import { Layout } from 'components/layout';
import theme from 'shared/style/theme';

const Home: ActivityComponentType = () => {
  const t = theme;
  console.log('t :', t);

  return (
    <Layout activeTab={'Home'}>
      <HomeComponent.Dashboard />
      <UiComponent.Footer />
    </Layout>
  );
};

export default Home;
