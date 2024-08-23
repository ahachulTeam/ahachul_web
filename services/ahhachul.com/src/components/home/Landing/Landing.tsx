import React from 'react';

import AppCTAFlows from './appCTAFlows/AppCTAFlows';
import CheerUpUser from './cheerUpUser/CheerUpUser';
import Subway from './subway/Subway';

const Landing = () => {
  return (
    <main>
      <AppCTAFlows />
      <CheerUpUser />
      <Subway />
    </main>
  );
};

export default Landing;
