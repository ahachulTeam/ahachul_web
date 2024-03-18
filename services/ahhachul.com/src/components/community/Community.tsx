import React from 'react';

import { wrap } from './style';
import { TabSection } from './tabSection';
import { BannerSection } from './bannerSection';
import ListSection from './listSection/ListSection';

const Community = () => {
  return (
    <main css={wrap}>
      <TabSection />
      <BannerSection />
      <ListSection />
    </main>
  );
};

export default Community;
