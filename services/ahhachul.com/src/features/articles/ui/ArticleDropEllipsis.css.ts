import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SmoothButton } from 'shared/ui/Button/SmoothButton';

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
  color: #ffffff;
  font-size: 22px;
`;

export const HeaderDescription = styled.p`
  margin-top: 12px;
  font-weight: 500;
  color: #f7f7f7;
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
  margin-top: 28px;
  display: flex;
  gap: 16px;
`;

export const DefaultViewHeader = styled.header`
  display: flex;
  height: 72px;
  align-items: center;
  border-bottom: 1px solid #f7f7f7;
  padding-left: 8px;
  margin-bottom: 16px;
`;

export const DefaultViewTitle = styled.h2`
  font-weight: 600;
  color: #f7f7f7;
  font-size: 19px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DangerButton = styled(Button)`
  background-color: #fff0f0;
  color: #ff3f40;
`;
