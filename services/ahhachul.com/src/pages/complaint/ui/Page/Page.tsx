import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';

import * as styles from './Page.css';

import { FileComplaint as GridComplaintCardSection } from '../_common/FileComplaint(민원을넣다)/FileComplaint';

const Complaint: ActivityComponentType = () => {
  return (
    <Layout showNavbar appBar={{ renderLeft: renderLeftLogo, renderRight }}>
      <GridComplaintCardSection css={styles.layout} />
    </Layout>
  );
};

export default Complaint;
