import React from 'react';
import { Nullable } from '@/src/types';
import BlindDateNavigationBar from './blindDateNavigationBar';
import BlindList from './blindList/BlindList';
import PartyList from './partyList/PartyList';
import { scrollable, wrapper } from './style';

const Dashboard = () => {
  const topEl = React.useRef<Nullable<HTMLDivElement>>(null);
  const scrollToTop = () => topEl?.current?.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main css={wrapper}>
      <div ref={topEl} css={scrollable}>
        <BlindList />
        <PartyList />
      </div>
      <BlindDateNavigationBar scrollToTop={scrollToTop} />
    </main>
  );
};

export default Dashboard;
