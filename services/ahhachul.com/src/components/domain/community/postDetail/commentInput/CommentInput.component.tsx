import { useQueryClient } from '@tanstack/react-query';

import { API_SERVICE_PATHS } from '@ahhachul/http';
import { sleep } from '@ahhachul/utils';

import { UiComponent } from '@/components';
import { useAuth } from '@/contexts';
import { usePostComment } from '@/services/comment';
import { communityKeys } from '@/services/community';

type Props = {
  id: number;
};

const CommuntiyCommentInput = ({ id }: Props) => {
  const {
    authService: { isAuthenticated },
  } = useAuth();
  const queryClient = useQueryClient();
  const communityCommentQueryKey = communityKeys.comments(id);
  const { mutate } = usePostComment();

  const submitComment = ({ isPrivate, comment }: { isPrivate: boolean; comment: string }) => {
    mutate(
      {
        postId: id,
        content: comment,
        upperCommentId: null,
        isPrivate: isPrivate,
        servicePath: API_SERVICE_PATHS.community,
      },
      {
        onSuccess: async res => {
          queryClient.invalidateQueries({
            queryKey: communityCommentQueryKey,
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
      disabled={!isAuthenticated}
      placeholder="댓글을 입력해주세요."
    />
  );
};

export default CommuntiyCommentInput;
