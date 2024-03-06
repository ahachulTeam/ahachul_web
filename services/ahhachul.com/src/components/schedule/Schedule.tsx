import React from 'react';
import { UiComponent } from 'components';
import { title } from './style';
import { useCheckSignin } from 'hooks';

const Schedule = () => {
  const { isLoading } = useCheckSignin();

  return (
    <main css={{ padding: '20px' }}>
      <h1 css={title}>this is Schedule page (before user loggedin)</h1>
      {isLoading && <UiComponent.Loading isWhite opacity={1} />}
    </main>
  );
};

export default Schedule;
