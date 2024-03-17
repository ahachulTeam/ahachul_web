import React from 'react';

import { useLoading } from 'hooks';
import { wrap } from './style';
import { TabSection } from './tabSection';
import { BannerSection } from './bannerSection';
import ListSection from './listSection/ListSection';

const Community = () => {
  useLoading();

  return (
    <main css={wrap}>
      <TabSection />
      <BannerSection />
      <ListSection />
    </main>
  );
};

export default Community;
