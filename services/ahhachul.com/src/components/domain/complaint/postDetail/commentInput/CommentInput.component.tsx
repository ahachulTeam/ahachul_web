import { useQueryClient } from '@tanstack/react-query';

import { API_SERVICE_PATHS } from '@ahhachul/http';
import { sleep } from '@ahhachul/utils';

import { UiComponent } from '@/components';
import { useAuth } from '@/contexts';
import { usePostComment } from '@/services/comment';
import { complaintKeys } from '@/services/complaint';

type Props = {
  id: number;
};

const ComplaintCommentInput = ({ id }: Props) => {
  const {
    authService: { isAuthenticated },
  } = useAuth();
  const queryClient = useQueryClient();
  const complaintCommentQueryKey = complaintKeys.comments(id);
  const { mutate } = usePostComment();

  const submitComment = ({
    isPrivate,
    comment,
    imageUrls,
  }: {
    isPrivate: boolean;
    comment: string;
    imageUrls: string[];
  }) => {
    mutate(
      {
        postId: id,
        content: comment,
        upperCommentId: null,
        isPrivate: isPrivate,
        imageUrls,
        servicePath: API_SERVICE_PATHS.complaint,
      },
      {
        onSuccess: async res => {
          queryClient.invalidateQueries({
            queryKey: complaintCommentQueryKey,
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

export default ComplaintCommentInput;
