import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { withSuspense } from '@ahhachul/react-hooks-utility';

import type { CommunityDetail } from 'pages/communicate/model';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { IResponse } from 'entities/with-server';
import type { WithArticleId } from 'features/articles';
import { CommunityArticleDetail } from './CommunityArticleDetail';

interface CommunityDetailWrapperProps extends WithArticleId {
  preloadRef: Promise<AxiosResponse<IResponse<CommunityDetail>>> | null;
}

const CommunityDetailWrapper = ({
  articleId,
  preloadRef,
}: CommunityDetailWrapperProps) => {
  const [initialData, setData] = useState<AxiosResponse<
    IResponse<CommunityDetail>
  > | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    preloadRef && readData();

    // todo: 공통 util function으로 빼기
    async function readData() {
      try {
        const response = await preloadRef;
        setData(response);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }
  }, [preloadRef]);

  if (error) {
    // 에러를 다시 던져 에러 경계로 전파하기
    throw error;
  }

  return (
    initialData && (
      <CommunityArticleDetail articleId={articleId} initialData={initialData} />
    )
  );
};

export default withSuspense(CommunityDetailWrapper, {
  fallback: <Loading />,
});
