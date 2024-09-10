import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { CTAFlows } from 'features/call-to-actions';
import { CheerUpPhrase } from 'features/users';
import { Layout, Navbar } from 'widgets';
import { TrainInfo } from 'widgets/train-infos';
import { StationSelect, renderRight } from 'widgets/layout-header';
import * as styles from './Page.css';
import { useGetSignInRedirectUrl } from 'entities/app-authentications/api';

const Home: ActivityComponentType = () => {
  const results = useGetSignInRedirectUrl();
  console.log('results:', results);

  return (
    <Layout
      appBar={{
        overflow: 'visible',
        renderLeft: StationSelect,
        renderRight,
      }}
      navigationSlot={Navbar}
    >
      <CTAFlows css={styles.ctaFlowsLayout} />
      <CheerUpPhrase css={styles.cheerUpPhraseLayout} />
      <TrainInfo />
    </Layout>
  );
};

export default Home;
