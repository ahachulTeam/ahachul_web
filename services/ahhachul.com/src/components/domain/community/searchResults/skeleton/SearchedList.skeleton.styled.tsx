import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DotIcon } from '@/assets/icons/system';

interface SectionWrapperProps {
  isScale: boolean;
}
export const SectionWrapper = styled.section<SectionWrapperProps>`
  padding-top: 99px;
  transform:  ${({ isScale }) => (isScale ? 'translateY(-50px)' : 'translateY(0)')}

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

export const ArticleItem = styled.article<{ delay: number }>`
  padding: 24px 20px;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 6px;
`;

export const TextSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 66px;
  min-width: 66px;
  aspect-ratio: 1;
`;

export const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MetaInfoSection = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    color: ${theme.colors.gray[80]};
    display: flex;
    align-items: center;
    gap: 4px;
  `}
`;

export const StyledDotIcon = styled(DotIcon)`
  position: relative;
  top: 1px;
`;

export const CountSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => theme.colors.gray[80]};
`;
