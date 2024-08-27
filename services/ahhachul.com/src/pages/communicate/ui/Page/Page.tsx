import React from 'react';
import { useTheme } from '@emotion/react';
import { type ActivityComponentType } from '@stackflow/react';
import { Layout, Navbar } from 'widgets';
import { renderLeft, renderRight } from 'widgets/layout-header';

const Community: ActivityComponentType = () => {
  const {
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ renderLeft, renderRight }} navigationSlot={<Navbar />}>
      <div css={{ color: text[50] }}>Community</div>
    </Layout>
  );
};

export default Community;
