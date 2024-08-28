import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { CTAFlows } from 'features/call-to-actions';
import { CheerUpPhrase } from 'features/users';
import { Layout, Navbar } from 'widgets';
import { TrainInfo } from 'widgets/train-infos';
import { renderLeft, renderRight } from 'widgets/layout-header';

const Home: ActivityComponentType = () => {
  return (
    <Layout appBar={{ renderLeft, renderRight }} navigationSlot={<Navbar />}>
      <CTAFlows />
      <CheerUpPhrase />
      <TrainInfo />
    </Layout>
  );
};

export default Home;
