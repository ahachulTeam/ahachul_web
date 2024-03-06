import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { BPayComponent } from 'components';

const BPay: ActivityComponentType = () => {
  return (
    <Layout activeTab={'BPay'}>
      <BPayComponent.BPayMain />
    </Layout>
  );
};

export default BPay;
