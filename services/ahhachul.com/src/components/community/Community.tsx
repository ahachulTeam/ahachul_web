import React from 'react';

import { useLoading } from 'hooks';
import { wrap } from './style';
import { TabSection } from './tabSection';

const Community = () => {
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

export default Community;
