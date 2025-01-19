import styled from '@emotion/styled';

import { fadeIn } from '@/styles';

export const Section = styled.section`
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  animation-delay: 100ms;
`;

export const CommentItem = styled.div<{ delay: number }>`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
  background-color: ${({ theme }) => theme.colors.gray[10]};
  padding: 16px 20px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  animation-delay: ${({ delay }) => (delay + 1) * 100}ms;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
`;
