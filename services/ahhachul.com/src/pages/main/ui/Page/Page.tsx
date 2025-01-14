import type { ActivityComponentType } from '@stackflow/react';
import { CTAFlows } from 'features/call-to-actions';
import { CheerUpPhrase } from 'features/users';
import { Layout } from 'widgets';
import { Footer } from 'widgets/layout-footer/ui/Footer';
import { StationSelect, renderRight } from 'widgets/layout-header';
import { TrainInfo } from 'widgets/train-infos';

import * as styles from './Page.css';

const Home: ActivityComponentType = () => {
  return (
    <Layout
      showNavbar
      appBar={{
        renderRight,
        renderLeft: StationSelect,
        overflow: 'visible',
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
