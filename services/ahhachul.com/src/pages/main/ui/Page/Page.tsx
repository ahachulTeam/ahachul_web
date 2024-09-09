import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { CTAFlows } from 'features/call-to-actions';
import { CheerUpPhrase } from 'features/users';
import { Layout, Navbar } from 'widgets';
import { TrainInfo } from 'widgets/train-infos';
import { renderLeftStationSelect, renderRight } from 'widgets/layout-header';
import * as styles from './Page.css';

const Home: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{
        overflow: 'visible',
        renderLeft: renderLeftStationSelect,
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
