import styled from '@emotion/styled';

export const SubmitContainer = styled.button`
  position: fixed;
  top: 0;
  right: 20px;
  background: #141517;
  zindex: 15;
`;

export const SubmitButton = styled.button`
  ${({ theme }) => theme.fonts.titleMedium};

  color: ${({ theme }) => theme.colors.black};
  width: max-content;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
