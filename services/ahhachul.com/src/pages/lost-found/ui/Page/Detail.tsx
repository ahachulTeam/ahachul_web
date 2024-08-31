import React from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import type { WithArticleId } from 'features/articles';
import LostFoundArticleDetail from '../_common/LostFoundArticleDetail/LostFoundArticleDetail';

const LostFoundDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  return (
    <Layout>
      <LostFoundArticleDetail articleId={articleId} />
    </Layout>
  );
};

export default LostFoundDetail;
