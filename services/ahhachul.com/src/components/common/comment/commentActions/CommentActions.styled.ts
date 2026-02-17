import { type Interpolation, type Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

import { SmoothButton } from '../../button/SmoothButton.component';

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
  background-color: var(--ah-color-legacy-surface-soft);
  color: var(--ah-color-legacy-text-contrast);
`;

const resolveSecondaryBackgroundColor = (variant?: 'default' | 'primary' | 'danger') => {
  if (variant === 'primary') {
    return 'var(--ah-color-legacy-status-primary-soft)';
  }

  if (variant === 'danger') {
    return 'var(--ah-color-legacy-status-critical)';
  }

  return 'var(--ah-color-legacy-surface-soft-alt)';
};

export const SecondaryButton = styled.button<{
  variant?: 'default' | 'primary' | 'danger';
}>`
  ${buttonBase}
  justify-content: center;
  border-radius: 9999px;
  font-size: 19px;
  background-color: ${props => resolveSecondaryBackgroundColor(props.variant)};
  color: ${props =>
    props.variant === 'default' ? 'var(--ah-color-legacy-text-contrast)' : 'var(--ah-color-white)'};
`;

export const SmoothSecondaryButton = styled(SmoothButton)`
  ${buttonBase}
  justify-content: center;
  border-radius: 9999px;
  font-size: 19px;
  background-color: var(--ah-color-legacy-status-critical);
  color: var(--ah-color-white);
`;

export const HeaderWrapper = styled.header`
  margin-top: 21px;
`;

export const HeaderTitle = styled.h2`
  margin-top: 10px;
  font-weight: 600;
  color: var(--ah-color-legacy-text-contrast-alpha);
  font-size: 22px;
`;

export const HeaderDescription = styled.p`
  margin-top: 12px;
  font-weight: 500;
  color: var(--ah-color-gray-90);
  font-size: 17px;
  line-height: 24px;
`;

export const List = styled.ul`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--ah-color-gray-20);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: var(--ah-color-legacy-text-disabled);
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
  color: var(--ah-color-legacy-text-contrast-alpha);
  font-size: 19px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DangerButton = styled.button`
  ${buttonBase}
  background-color: var(--ah-color-legacy-surface-danger-tint);
  color: var(--ah-color-legacy-status-critical);
`;
