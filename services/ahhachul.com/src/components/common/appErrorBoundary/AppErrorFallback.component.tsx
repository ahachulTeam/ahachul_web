import styled from '@emotion/styled';

import { theme } from '@/styles';

interface AppErrorFallbackProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  useBackNavigation?: boolean;
}

const AppErrorFallback = ({
  title = '정보를 불러올 수 없습니다.',
  description = '잠시 후 다시 시도해주세요. 문제가 계속되면 앱을 다시 실행해주세요.',
  actionLabel = '다시 시도',
  onAction,
  useBackNavigation = false,
}: AppErrorFallbackProps) => {
  const handleAction = () => {
    if (onAction) {
      onAction();
      return;
    }

    if (useBackNavigation) {
      if (window.history.length > 1) {
        window.history.back();
        return;
      }

      window.location.reload();
    }
  };

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <S.ActionButton type="button" onClick={handleAction}>
        {actionLabel}
      </S.ActionButton>
    </S.Container>
  );
};

const S = {
  Container: styled.section`
    min-height: 60vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 20px;
    background-color: ${theme.colors.white};
  `,
  Title: styled.h1`
    ${theme.fonts.titleLarge};
    color: ${theme.colors.gray[90]};
  `,
  Description: styled.p`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
    margin-top: 8px;
    white-space: break-spaces;
  `,
  ActionButton: styled.button`
    ${theme.fonts.labelMedium};
    margin-top: 16px;
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray[40]};
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray[90]};
    padding: 10px 14px;
  `,
};

export default AppErrorFallback;
