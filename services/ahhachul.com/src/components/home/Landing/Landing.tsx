import React from 'react';

import { HeaderSection } from './headerSection';
import { RequestPayment } from './requestPayment';
import { RecommendTicket } from './recommendTicket';
import { ReservedClass } from './reservedClass';
import { MyTicket } from './myTicket';

const Landing = () => {
  return (
    <>
      <main>
        <HeaderSection />
        <RequestPayment />
        <RecommendTicket />
        <ReservedClass />
        <MyTicket />
      </main>
    </>
  );
};

export default Landing;
