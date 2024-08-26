import React from 'react';
import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout, Navbar } from 'widgets';

const Complaint: ActivityComponentType = () => {
  const {
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: 'Complaint' }} navigationSlot={<Navbar />}>
      <div css={{ color: text[50] }}>Complaint</div>
    </Layout>
  );
};

export default Complaint;
