import React from 'react';

import { useLoading } from 'hooks';
import { title } from './style';

const Community = () => {
  useLoading();

  return (
    <main css={{ padding: '20px' }}>
      <h1 css={title}>this is Community page (before user loggedin)</h1>
    </main>
  );
};

export default Community;
