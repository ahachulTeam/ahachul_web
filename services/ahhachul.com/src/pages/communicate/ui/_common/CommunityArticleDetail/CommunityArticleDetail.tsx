import React from 'react';
import { AxiosResponse } from 'axios';

import type { CommunityDetail } from 'pages/communicate/model';
import { useGetCommunityDetail } from 'pages/communicate/api/get-detail';
import type { WithArticleId } from 'features/articles';
import { BaseArticleTemplate } from 'features/articles/ui/BaseArticleTemplate';
import type { IResponse } from 'entities/with-server';

interface CommunityArticleDetailProps extends WithArticleId {
  initialData: AxiosResponse<IResponse<CommunityDetail>>;
}

export const CommunityArticleDetail = ({
  articleId,
  initialData,
}: CommunityArticleDetailProps) => {
  const {
    data: {
      data: { result: article },
    },
  } = useGetCommunityDetail({ articleId }, initialData);

  return <BaseArticleTemplate article={article} />;
};
