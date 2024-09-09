import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { FileComplaint as GridComplaintCardSection } from '../_common/FileComplaint(민원을넣다)/FileComplaint';

const CreateComplaintArticle: ActivityComponentType = () => {
  return (
    <Layout appBar={{ title: '민원 접수' }}>
      <GridComplaintCardSection />
    </Layout>
  );
};

export default CreateComplaintArticle;
