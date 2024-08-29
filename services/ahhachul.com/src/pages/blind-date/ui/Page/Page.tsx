import React from 'react';
import { useTheme } from '@emotion/react';
import { type ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';

const BlindDate: ActivityComponentType = () => {
  const {
    dimensions: {
      size: { gutter },
    },
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: '소개팅' }}>
      <div css={{ padding: gutter, color: text[50] }}>소개팅</div>
    </Layout>
  );
};

export default BlindDate;
