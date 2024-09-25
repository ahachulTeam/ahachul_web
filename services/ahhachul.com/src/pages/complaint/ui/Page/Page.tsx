import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { FileComplaint as GridComplaintCardSection } from '../_common/FileComplaint(민원을넣다)/FileComplaint';
import * as styles from './Page.css';

const Complaint: ActivityComponentType = () => {
  return (
    <Layout showNavbar appBar={{ renderLeft: renderLeftLogo, renderRight }}>
      <GridComplaintCardSection css={styles.layout} />
    </Layout>
  );
};

export default Complaint;
