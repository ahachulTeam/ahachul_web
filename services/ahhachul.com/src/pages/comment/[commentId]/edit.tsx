import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent } from '@/components';
import type { WithPostId } from '@/types';

const EditCommentPage: ActivityComponentType<{ commentId: number } & WithPostId> = ({
  params: { id, commentId },
}: {
  params: { commentId: number } & WithPostId;
}) => {
  return (
    <LayoutComponent.Base>
      {`EditCommentPage - ${id}`} -----
      {commentId}
    </LayoutComponent.Base>
  );
};

export default EditCommentPage;
