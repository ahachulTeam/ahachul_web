import React, { useRef } from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { CTAFlows } from 'features/call-to-actions';
import { CheerUpPhrase } from 'features/users';
import { Layout, Navbar } from 'widgets';
import { TrainInfo } from 'widgets/train-infos';
import { Footer } from 'widgets/layout-footer/ui/Footer';
import { StationSelect, renderRight } from 'widgets/layout-header';
import { useScrollTracker } from 'shared/lib/hooks/useScrollTracker';
import * as styles from './Page.css';

const Home: ActivityComponentType = () => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { condition } = useScrollTracker(layoutRef);

  return (
    <Layout
      ref={layoutRef}
      condition={condition}
      navigationSlot={Navbar}
      appBar={{
        overflow: 'visible',
        renderLeft: StationSelect,
        renderRight,
      }}
    >
      <CTAFlows css={styles.ctaFlowsLayout} />
      <CheerUpPhrase css={styles.cheerUpPhraseLayout} />
      <TrainInfo />
      <Footer />
    </Layout>
  );
};

export default Home;
