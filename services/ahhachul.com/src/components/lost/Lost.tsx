import React from 'react';

import { TabSection } from './tabSection';
import { wrap } from './style';
import ListSection from './listSection/ListSection';

const Lost = () => {
  return (
    <main css={wrap}>
      <TabSection />
      <ListSection />
    </main>
  );
};

export default Lost;
