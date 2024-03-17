import React from 'react';

import { useLoading } from 'hooks';
import { TabSection } from './tabSection';
import { wrap } from './style';
import ListSection from './listSection/ListSection';
import RankCategory from './rankCategory/RankCategory';

const Lost = () => {
  useLoading();

  return (
    <main css={wrap}>
      <TabSection />
      <RankCategory />
      <ListSection />
    </main>
  );
};

export default Lost;
