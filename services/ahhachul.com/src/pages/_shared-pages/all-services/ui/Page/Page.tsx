import React from 'react';
import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';

const AllServices: ActivityComponentType = () => {
  const {
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: 'AllServices' }}>
      <div css={{ color: text[50] }}>AllServices</div>
    </Layout>
  );
};

export default AllServices;
