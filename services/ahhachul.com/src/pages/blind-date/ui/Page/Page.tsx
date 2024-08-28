import React from 'react';
import { useTheme } from '@emotion/react';
import { type ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';

const BlindDate: ActivityComponentType = () => {
  const {
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: 'BlindDate' }}>
      <div css={{ color: text[50] }}>BlindDate</div>
    </Layout>
  );
};

export default BlindDate;
