import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Dim = styled.div`
  ${({ theme }) => css`
    position: fixed;
    inset: 0;
    background-color: ${theme.colors.dim};
    z-index: ${theme.zIndex.dim};
    transition: opacity 0.3s ease;
  `}
`;

export const Sheet = styled.div`
  ${({ theme }) => css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${theme.zIndex.drawer};
    display: flex;
    flex-direction: column;
    padding: 16px;
    padding-bottom: 40px;
    animation: slideIn 0.3s ease-out;

    @keyframes slideIn {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    & > button:not(:last-of-type) {
      border-bottom: 1px solid ${theme.colors.gray[20]};
    }
  `}
`;

export const ActionButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.bodyLargeSemi};

    width: 100%;
    height: 52px;
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};

    cursor: pointer;
  `}
`;

export const CancelButton = styled(ActionButton)`
  margin-top: 10px;
  border-radius: 16px;
`;
