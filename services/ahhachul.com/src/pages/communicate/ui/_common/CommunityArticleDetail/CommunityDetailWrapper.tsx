import React from 'react';
import { AxiosResponse } from 'axios';
import { suspend as readData } from 'suspend-react';

import type { CommunityDetail } from 'pages/communicate/model';
import { IResponse } from 'entities/with-server';
import type { WithArticleId } from 'features/articles';
import { CommunityArticleDetail } from './CommunityArticleDetail'; // Ensure this line is uncommented and the component is imported

interface CommunityDetailWrapperProps extends WithArticleId {
  preloadRef: Promise<AxiosResponse<IResponse<CommunityDetail>>> | null;
}

export const CommunityDetailWrapper = ({
  articleId,
  preloadRef,
}: CommunityDetailWrapperProps) => {
  const data = readData(async () => await preloadRef, [preloadRef]);
  return <CommunityArticleDetail articleId={articleId} initialData={data} />;
};
