import React, { useReducer } from 'react';

import useDidMount from 'hooks/useDidMount';

import { HeaderSection } from './headerSection';
import { RequestPayment } from './requestPayment';
import { RecommendTicket } from './recommendTicket';
import { ReservedClass } from './reservedClass';
import { MyTicket } from './myTicket';
import { BeginningBottomSheet } from './bottomSheet';

const Landing = () => {
  const [show, toggle] = useReducer((c) => !c, false);

  useDidMount(() => {
    const timer = setTimeout(() => {
      toggle();
    }, 1200);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <main>
        <HeaderSection />
        <RequestPayment />
        <RecommendTicket />
        <ReservedClass />
        <MyTicket />
      </main>
      {/* {isLoading && <UiComponent.Loading isWhite opacity={1} />} */}
      <BeginningBottomSheet isShowing={show} onClose={toggle} />
    </>
  );
};

export default Landing;
