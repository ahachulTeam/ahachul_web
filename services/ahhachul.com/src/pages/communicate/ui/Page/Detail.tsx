import React from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import type { WithArticleId } from 'features/articles';
import CommunityArticleDetail from '../_common/CommunityArticleDetail/CommunityArticleDetail';

const CommunityDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  return (
    <Layout>
      <CommunityArticleDetail articleId={articleId} />
    </Layout>
  );
};

export default CommunityDetail;
