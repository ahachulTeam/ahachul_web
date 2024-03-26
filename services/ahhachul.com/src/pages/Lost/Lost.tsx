import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { LostComponent } from 'components';
import { UiComponent } from 'components';

const Lost: ActivityComponentType = () => {
  return (
    <Layout activeTab={'Lost'} hasSearch>
      <LostComponent.LostMain />
      <UiComponent.SearchModal>
        <UiComponent.SearchBase />
        <UiComponent.AutoKeywords />
      </UiComponent.SearchModal>
    </Layout>
  );
};

export default Lost;
