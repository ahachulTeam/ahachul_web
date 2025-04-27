import { type Interpolation, type Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

import { SmoothButton } from '../button/SmoothButton.component';

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

export const buttonFilter = () =>
  ({
    flexShrink: 0,
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
  }) as Interpolation<Theme>;

export const buttonBase = css`
  display: flex;
  height: 48px;
  width: 100%;
  align-items: center;
  gap: 15px;
  border-radius: 16px;
  padding: 0 16px;
  font-weight: 600;
  font-size: 17px;
  transition: transform 0.2s;

  &:focus {
    transform: scale(0.95);
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const Button = styled.button`
  ${buttonBase}
  background-color: #F7F8F9;
  color: #222222;
`;

export const SecondaryButton = styled.button<{
  variant?: 'default' | 'primary' | 'danger';
}>`
  ${buttonBase}
  justify-content: center;
  border-radius: 9999px;
  font-size: 19px;
  background-color: ${props =>
    props.variant === 'primary' ? '#4DAFFF' : props.variant === 'danger' ? '#FF3F40' : '#F0F2F4'};
  color: ${props => (props.variant === 'default' ? '#222222' : '#FFFFFF')};
`;

export const SmoothSecondaryButton = styled(SmoothButton)`
  ${buttonBase}
  justify-content: center;
  border-radius: 9999px;
  font-size: 19px;
  background-color: #ff3f40;
  color: #ffffff;
`;

export const HeaderWrapper = styled.header`
  margin-top: 21px;
`;

export const HeaderTitle = styled.h2`
  margin-top: 10px;
  font-weight: 600;
  color: #222226f3;
  font-size: 22px;
`;

export const HeaderDescription = styled.p`
  margin-top: 12px;
  font-weight: 500;
  color: #33333e;
  font-size: 17px;
  line-height: 24px;
`;

export const List = styled.ul`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: #999999;
  font-size: 15px;
`;

export const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 16px;
`;

export const DefaultViewHeader = styled.header`
  display: flex;
  height: 72px;
  align-items: center;
  padding-left: 8px;
  margin-bottom: 16px;
`;

export const DefaultViewTitle = styled.h2`
  font-weight: 600;
  color: #222226f3;
  font-size: 19px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DangerButton = styled.button`
  ${buttonBase}
  background-color: #fff0f0;
  color: #ff3f40;
`;

export const GreenButton = styled.button`
  ${buttonBase}

  background-color: #4ade80; /* 초록색 배경 */
  color: white;
`;
