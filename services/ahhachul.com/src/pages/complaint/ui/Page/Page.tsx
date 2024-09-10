import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout, Navbar } from 'widgets';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { FileComplaint as GridComplaintCardSection } from '../_common/FileComplaint(민원을넣다)/FileComplaint';
import * as styles from './Page.css';

const Complaint: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{ renderLeft: renderLeftLogo, renderRight }}
      navigationSlot={Navbar}
    >
      <GridComplaintCardSection css={styles.layout} />
    </Layout>
  );
};

export default Complaint;
