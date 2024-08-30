import React from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import type { WithArticleId } from 'features/articles';

const ComplaintDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  return (
    <Layout>
      <div css={{ color: 'white' }}>hello this is complaint detail page!</div>
      <p css={{ color: 'white' }}>articleId is ... {articleId}</p>
    </Layout>
  );
};

export default ComplaintDetail;
