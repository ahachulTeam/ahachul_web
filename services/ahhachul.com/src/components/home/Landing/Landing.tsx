import React from 'react';

import { HeaderSection } from './headerSection';
import Subway from './subway/Subway';

const Landing = () => {
  return (
    <main>
      <HeaderSection />
      <Subway />
      {/* <RequestPayment /> */}
      {/* <RecommendTicket /> */}
      {/* <ReservedClass /> */}
      {/* <MyTicket /> */}
    </main>
  );
};

export default Landing;
