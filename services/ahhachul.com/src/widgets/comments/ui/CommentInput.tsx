import styled from '@emotion/styled';
import { useState, useRef, ChangeEvent, FocusEvent } from 'react';

export const CommentInput: React.FC = () => {
  const [comment, setComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    adjustTextareaHeight(e.target);
  };

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;

    // TOOD: change to handleSubmit
    console.log(comment.trim());
    setComment('');
    setTimeout(() => {
      if (textareaRef.current) {
        adjustTextareaHeight(textareaRef.current);
      }
    }, 0);
  };

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleTextareaBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight(e.target);
  };

  const isCommentValid = comment.trim().length > 0;

  return (
    <CommentInputContainer>
      <StyledTextarea
        value={comment}
        maxLength={100}
        ref={textareaRef}
        placeholder="댓글을 남겨주세요."
        onBlur={handleTextareaBlur}
        onChange={handleCommentChange}
      />
      <SendButton
        isValid={isCommentValid}
        disabled={!isCommentValid}
        aria-label="댓글 전송"
        onClick={handleCommentSubmit}
      >
        등록
      </SendButton>
    </CommentInputContainer>
  );
};

const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #141517;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgb(196, 212, 252, 0.37);
  padding: 16px 24px 16px 16px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
`;

const StyledTextarea = styled.textarea`
  flex-grow: 1;
  resize: none;
  outline: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  max-height: 120px;
  line-height: 20px;
  overflow-y: auto;
  color: #ffffff;
`;

const SendButton = styled.button<{ isValid: boolean }>`
  align-self: flex-end;
  width: max-content;
  background-color: ${(props) => (props.isValid ? '#ffffff' : '#efeeff')};
  color: #202020;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;
  font-size: 15px;
  font-weight: 500;
`;
