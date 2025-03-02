import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent } from '@/components';
import type { WithPostId } from '@/types';

const NewCommentReplyPage: ActivityComponentType<{ commentId: number } & WithPostId> = ({
  params: { id, commentId },
}: {
  params: { commentId: number } & WithPostId;
}) => {
  return (
    <LayoutComponent.Base>
      {`NewCommentReplyPage - ${id}`} -----
      {commentId}
    </LayoutComponent.Base>
  );
};

export default NewCommentReplyPage;
