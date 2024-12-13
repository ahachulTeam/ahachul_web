import { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { queryClient } from 'app/lib/react-query';
import { getQueryKeys } from 'shared/api';
import { LOST_FOUND_QUERY_KEY } from 'pages/lost-found/api/query-key';
import { useGetUserInfo } from 'features/users/api';
import { useAuthStore } from 'entities/app-authentications/slice';
import { IResponse } from 'entities/with-server';
import { WithArticleId } from 'features/articles';
import { ArticleDropEllipsis } from 'features/articles/ui/ArticleDropEllipsis';
import * as styles from './LayoutHeaderRightContent.css';

export const EllipsisRightContent = ({ articleId }: WithArticleId) => {
  const { auth } = useAuthStore();
  const { data: myInfo, isSuccess } = useGetUserInfo(auth);
  const queryData = queryClient.getQueryData(
    getQueryKeys(LOST_FOUND_QUERY_KEY).detail(articleId),
  ) as AxiosResponse<IResponse<{ createdBy: number }>>;

  const showEllipsis = useMemo(() => {
    if (!myInfo) return false;
    if (!isSuccess) return false;
    if (!queryData) return false;
    return myInfo.memberId === +queryData?.data?.result?.createdBy;
  }, [articleId, queryData, myInfo, isSuccess]);

  return (
    <div css={styles.rightJustOne}>
      {showEllipsis ? <ArticleDropEllipsis articleId={articleId} /> : null}
    </div>
  );
};
