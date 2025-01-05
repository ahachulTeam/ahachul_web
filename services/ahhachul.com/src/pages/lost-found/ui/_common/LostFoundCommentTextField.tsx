import React, { useRef } from 'react';
import type { EditorState } from 'lexical';
import CommentTextField from 'widgets/comments/ui/CommentTextField';
import { usePostComment } from 'pages/lost-found/api/post-comment';
import { useAuthStore } from 'entities/app-authentications/slice';
import { isEmptyContent } from 'features/articles/lib/has-content-error';

interface Props {
  articleId: number;
  handleHitBottom: () => void;
}

const LostFoundCommentTextField = ({ articleId, handleHitBottom }: Props) => {
  const { auth } = useAuthStore();
  const content = useRef<string>('');

  const disabled = !auth;

  const { mutate } = usePostComment(articleId);

  const handleSubmit = () => {
    if (isEmptyContent(content.current)) {
      window.alert('댓글을 입력해주세요.');
    }

    mutate(
      {
        postId: articleId,
        content: content.current,
        upperCommentId: null,
        isPrivate: null,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            handleHitBottom();
          }, 100);
        },
      },
    );
  };

  return (
    <CommentTextField
      disabled={disabled}
      placeholder="댓글을 남겨주세요."
      onSubmit={handleSubmit}
      onChange={(val: EditorState) => {
        content.current = JSON.stringify(val.toJSON());
      }}
    />
  );
};

export default LostFoundCommentTextField;
