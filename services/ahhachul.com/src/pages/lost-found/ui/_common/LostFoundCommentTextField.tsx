import React, { useRef } from 'react';
import type { EditorState } from 'lexical';
import CommentTextField from 'widgets/comments/ui/CommentTextField';

const LostFoundCommentTextField = () => {
  const content = useRef<string>('');
  const handleCommentSubmit = () => {
    console.log('content:', content);
  };

  return (
    <CommentTextField
      placeholder="댓글을 남겨주세요."
      onSubmit={handleCommentSubmit}
      onChange={(val: EditorState) => {
        content.current = JSON.stringify(val.toJSON());
      }}
    />
  );
};

export default LostFoundCommentTextField;
