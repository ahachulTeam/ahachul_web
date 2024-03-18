import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { HomeComponent, UiComponent } from 'components';
import { useAppSelector } from 'stores';
import { Layout } from 'components/layout';
import { color } from 'styles/color';

const Home: ActivityComponentType = () => {
  const { auth } = useAppSelector((state) => state.auth);

  const c = color;
  console.log('c :', c);

  return (
    <Layout activeTab={'Home'}>
      {auth?.token.accessToken ? <HomeComponent.Dashboard /> : <HomeComponent.Landing />}
      <UiComponent.Footer />
    </Layout>
  );
};

export default Home;
