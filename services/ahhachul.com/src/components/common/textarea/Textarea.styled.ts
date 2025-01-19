import styled from '@emotion/styled';

export const Textarea = styled.textarea`
  width: 100%;
  height: 320px;
  padding: 14px 16px;
  resize: none;

  width: 100%;
  height: 52px;
  border-radius: 10px;
  padding: 0 16px;
  transition: 0.3s;

  &:disabled {
    -webkit-text-fill-color: rgba(0, 0, 0, 1);
    opacity: 1;
    cursor: not-allowed;
  }
`;
