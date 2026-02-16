import { useQueryClient } from '@tanstack/react-query';

import { API_SERVICE_PATHS } from '@ahhachul/http';
import { sleep } from '@ahhachul/utils';

import { UiComponent } from '@/components';
import { usePostComment } from '@/services/comment';
import { lostFoundKeys } from '@/services/lostFound';

type Props = {
  id: number;
};

const LostFoundCommentInput = ({ id }: Props) => {
  const queryClient = useQueryClient();
  const lostFoundCommentQueryKey = lostFoundKeys.comments(id);
  const { mutate } = usePostComment();

  const submitComment = ({ isPrivate, comment }: { isPrivate: boolean; comment: string }) => {
    mutate(
      {
        postId: id,
        content: comment,
        upperCommentId: null,
        isPrivate: isPrivate,
        servicePath: API_SERVICE_PATHS.lostFound,
      },
      {
        onSuccess: async res => {
          queryClient.invalidateQueries({
            queryKey: lostFoundCommentQueryKey,
          });

          await sleep(250);

          const comment = document.querySelector(`[data-comment-id="${res.result.id}"]`);
          if (comment) {
            comment.scrollIntoView({
              block: 'start',
              behavior: 'smooth',
            });
          }
        },
      },
    );
  };

  return (
    <UiComponent.CommentInput
      showIsPrivateBtn
      onSubmit={submitComment}
      placeholder="댓글을 입력해주세요."
    />
  );
};

export default LostFoundCommentInput;
