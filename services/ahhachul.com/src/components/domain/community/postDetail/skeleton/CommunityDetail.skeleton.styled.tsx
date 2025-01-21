import styled from '@emotion/styled';

export const ArticleWrapper = styled.article`
  padding-top: 20px;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 0 20px;
`;

export const TitleWrapper = styled.div`
  padding-top: 13px;
  padding-bottom: 16px;
`;

export const MetaWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
`;

export const MetaLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => theme.fonts.bodyMedium};
`;

export const MetaRightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const ContentSection = styled.div`
  padding: 24px 0;
  margin-bottom: 12px;
`;

export const BottomSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[30]};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const BottomLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const BottomRightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const CommentsSection = styled.section`
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  animation-delay: 100ms;
`;

export const CommentItem = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
  background-color: ${({ theme }) => theme.colors.gray[10]};
  padding: 16px 20px;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  animation-delay: ${({ index }) => (index + 1) * 100}ms;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
`;
