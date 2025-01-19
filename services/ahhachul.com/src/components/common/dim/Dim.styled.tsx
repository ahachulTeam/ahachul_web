import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.size.header.height_m};
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.dim};
`;

export const Cover = styled.div<{ opacity: number; isWhite?: boolean }>`
  background: ${({ theme, isWhite }) => (isWhite ? theme.colors.white : theme.colors.black_00)};
  opacity: ${({ opacity }) => opacity};
  height: calc(100vh - ${({ theme }) => theme.size.header.height_m});
`;

export const Background = styled.div`
  position: fixed;
  left: 0;
  top: ${({ theme }) => theme.size.header.height_m};
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: calc(100vh - ${({ theme }) => theme.size.header.height_m});
  z-index: ${({ theme }) => theme.zIndex.drawer};
`;
