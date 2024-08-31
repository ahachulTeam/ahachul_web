import React from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import type { WithArticleId } from 'features/articles';
import ComplaintArticleDetail from '../_common/ComplaintArticleDetail/ComplaintArticleDetail';

const ComplaintDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  return (
    <Layout>
      <ComplaintArticleDetail articleId={articleId} />
    </Layout>
  );
};

export default ComplaintDetail;
