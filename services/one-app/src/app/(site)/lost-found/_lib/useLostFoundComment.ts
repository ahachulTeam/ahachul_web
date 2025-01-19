'use client';

import { useRef } from 'react';

import type { EditorState } from 'lexical';

import { useLostFoundPostComment } from './comments';

export const useLostFoundComment = (articleId: number) => {
  const content = useRef<string>('');
  const { mutate: postComment } = useLostFoundPostComment();

  const handleChangeComment = (val: EditorState | null) => {
    content.current = JSON.stringify(val ? val.toJSON() : null);
  };

  const handleSubmitComment = () => {
    postComment({
      articleId,
      content: content.current,
    });
  };
  return {
    handleChangeComment,
    handleSubmitComment,
  };
};
