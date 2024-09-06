import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { CTAFlows } from 'features/call-to-actions';
import { CheerUpPhrase } from 'features/users';
import { Layout, Navbar } from 'widgets';
import { TrainInfo } from 'widgets/train-infos';
import { renderLeftStationSelect, renderRight } from 'widgets/layout-header';
import * as styles from './Page.css';
import { useGetSubwayLinesInfo } from 'features/subway-lines/api/get-subway-lines-info';

const Home: ActivityComponentType = () => {
  const { data } = useGetSubwayLinesInfo();
  console.log('data:', data);
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
