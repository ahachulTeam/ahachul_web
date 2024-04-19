import React from 'react';

import HeaderSection from './headerSection/HeaderSection';
// import StationTalksSummary from './stationTalksSummary/StationTalksSummary';
// import MyShortestPathList from './myShortestPathList/MyShortestPathList';
import Subway from './subway/Subway';
// import SubwayLineTalksSummary from './subwayLineTalksSummary/SubwayLineTalksSummary';

const Landing = () => {
  return (
    <section>
      <HeaderSection />
      <Subway />
      {/* <SubwayLineTalksSummary /> */}
      {/* <StationTalksSummary /> */}
      {/* <MyShortestPathList /> */}
      {/* <RequestPayment /> */}
      {/* <RecommendTicket /> */}
      {/* <ReservedClass /> */}
      {/* <MyTicket /> */}
    </section>
  );
};

export default Landing;
