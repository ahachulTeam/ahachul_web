import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { vars } from '@ahhachul/themes';

import { HomeComponent, UiComponent } from 'components';
import { useAppSelector } from 'stores';
import { Layout } from 'components/layout';
import theme from 'styles/theme';

const Home: ActivityComponentType = () => {
  const { auth } = useAppSelector((state) => state.auth);

  const t = theme;
  // const hasWarning = true;
  console.log('t :', t);

  console.log(vars.colors);

  return (
    <Layout activeTab={'Home'}>
      {/* {hasWarning && <UiComponent.FixedWarning />} */}
      {auth?.accessToken ? <HomeComponent.Dashboard /> : <HomeComponent.Landing />}
      <UiComponent.Footer />
    </Layout>
  );
};

export default Home;
