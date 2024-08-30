import { withSuspense } from '@ahhachul/react-hooks-utility';
import type { WithArticleId } from 'features/articles';
import { useGetCommunityComments } from 'pages/communicate/api/get-comments';
import { BaseCommentList } from 'widgets/comments/ui/BaseCommentList';
import * as styles from './ArticleCommentList.css';

const ArticleCommentList = ({ articleId }: WithArticleId) => {
  const { data } = useGetCommunityComments({ articleId });

  return (
    <BaseCommentList
      commentsMap={data.comments}
      css={styles.commentListLayout}
    />
  );
};

export default withSuspense(ArticleCommentList, {
  fallback: 'something went wrong',
});
