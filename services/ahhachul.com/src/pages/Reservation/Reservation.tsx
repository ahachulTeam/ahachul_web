import React from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { Layout } from 'components/layout';
import { ReservationComponent } from 'components';

const Reservation: ActivityComponentType = () => {
  return (
    <Layout activeTab={'Reservation'}>
      <ReservationComponent.ReservationMain />
    </Layout>
  );
};

export default Reservation;
