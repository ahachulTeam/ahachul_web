import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.dim}; // 100
`;

export const Cover = styled.div<{ opacity: number; isWhite?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme, isWhite }) => (isWhite ? theme.colors.white : theme.colors.black_00)};
  opacity: ${({ opacity }) => opacity};
  z-index: ${({ theme }) => theme.zIndex.modal}; // 200
`;

export const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100vh;
  z-index: ${({ theme }) => theme.zIndex.drawer}; // 300
`;
