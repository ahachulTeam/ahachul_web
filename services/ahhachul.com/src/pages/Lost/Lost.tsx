import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { LostComponent } from 'components';
import { UiComponent } from 'components';

const Lost: ActivityComponentType = () => {
  return (
    <Layout activeTab={'Lost'} hasSearch>
      <LostComponent.LostMain />
      <UiComponent.FadeInModal>
        <UiComponent.SearchModal />
      </UiComponent.FadeInModal>
    </Layout>
  );
};

export default Lost;
