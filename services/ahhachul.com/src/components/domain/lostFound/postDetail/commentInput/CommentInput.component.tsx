import { UiComponent } from '@/components';
import { useAuth } from '@/contexts';
import { usePostComment } from '@/services/comment';
import { lostFoundKeys } from '@/services/lostFound';

type Props = {
  id: number;
};

const LostFoundCommentInput = ({ id }: Props) => {
  const {
    authService: { isAuthenticated },
  } = useAuth();
  const lostFoundCommentQueryKey = lostFoundKeys.comments(id);
  const { mutate } = usePostComment(lostFoundCommentQueryKey);

  const submitComment = ({ isPrivate, comment }: { isPrivate: boolean; comment: string }) => {
    mutate({
      postId: id,
      content: comment,
      upperCommentId: null,
      isPrivate: isPrivate,
      servicePath: 'lost-posts',
    });
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

export default LostFoundCommentInput;
