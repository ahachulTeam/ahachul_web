import React from 'react';
import Filter from './filter/Filter';

import { HeaderSection } from './headerSection';
// import MyShortestPathList from './myShortestPathList/MyShortestPathList';
import Subway from './subway/Subway';

const Landing = () => {
  return (
    <main>
      <HeaderSection />
      <Filter />
      <Subway />
      {/* <MyShortestPathList /> */}
      {/* <RequestPayment /> */}
      {/* <RecommendTicket /> */}
      {/* <ReservedClass /> */}
      {/* <MyTicket /> */}
    </main>
  );
};

export default Landing;
