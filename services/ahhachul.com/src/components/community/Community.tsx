import React from 'react';

import { wrap } from './style';
import { TabSection } from './tabSection';
import ListSection from './listSection/ListSection';

const Community = () => {
  return (
    <main css={wrap}>
      <TabSection />
      <ListSection />
    </main>
  );
};

export default Community;
