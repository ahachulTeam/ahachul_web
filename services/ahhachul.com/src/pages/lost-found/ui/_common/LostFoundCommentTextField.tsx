import React, { useRef } from 'react';
import type { EditorState } from 'lexical';
import CommentTextField from 'widgets/comments/ui/CommentTextField';
import { usePostComment } from 'pages/lost-found/api/post-comment';

interface Props {
  articleId: number;
}

const LostFoundCommentTextField = ({ articleId }: Props) => {
  const content = useRef<string>('');

  const { mutate } = usePostComment(articleId);

  const handleSubmit = () => {
    mutate({
      postId: articleId,
      content: content.current,
      upperCommentId: null,
      isPrivate: null,
    });
  };

  return (
    <CommentTextField
      placeholder="댓글을 남겨주세요."
      onSubmit={handleSubmit}
      onChange={(val: EditorState) => {
        content.current = JSON.stringify(val.toJSON());
      }}
    />
  );
};

export default LostFoundCommentTextField;
