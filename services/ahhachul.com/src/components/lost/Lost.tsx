import React from 'react';

import { TabSection } from './tabSection';
import { wrap } from './style';
import ListSection from './listSection/ListSection';
import RankCategory from './rankCategory/RankCategory';

const Lost = () => {
  return (
    <main css={wrap}>
      <TabSection />
      <RankCategory />
      <ListSection />
    </main>
  );
};

export default Lost;
