import type { ActivityComponentType } from '@stackflow/react';

import { HeaderComponent, LayoutComponent } from '@/components';

const HomePage: ActivityComponentType = () => {
  return (
    <LayoutComponent.Base
      navigationSlot
      appBar={{
        overflow: 'visible',
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
    >
      <div>hi</div>
      {/* <CTAFlows css={styles.ctaFlowsLayout} />
      <CheerUpPhrase css={styles.cheerUpPhraseLayout} />
      <TrainInfo />
      <Footer /> */}
    </LayoutComponent.Base>
  );
};

export default HomePage;
