import React from 'react';

import { useLoading } from 'hooks';
import { TabSection } from './tabSection';
import { wrap } from './style';

const Lost = () => {
  useLoading();

  return (
    <main css={wrap}>
      <TabSection />
      {/* <BannerSection />
      <FilterSection />
      <ListSection /> */}
    </main>
  );
};

export default Lost;
