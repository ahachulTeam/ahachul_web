import { useMemo, useState } from 'react';

import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { motion } from 'motion/react';

import { LayoutComponent, AuthComponent } from '@/components';
import { motions } from '@/constants';
import { theme } from '@/styles';
import { LOGIN_ERROR_MESSAGES, parseLoginErrorCode, type LoginErrorCode } from '@/utils/loginError';

const SignInPage: ActivityComponentType = () => {
  const [loginErrorCode, setLoginErrorCode] = useState<LoginErrorCode | null>(
    (() => {
      if (typeof window === 'undefined') {
        return null;
      }

      const rawErrorCode = new URLSearchParams(window.location.search).get('loginErrorCode');
      return parseLoginErrorCode(rawErrorCode);
    })(),
  );
  const errorMessage = useMemo(
    () => (loginErrorCode ? LOGIN_ERROR_MESSAGES[loginErrorCode] : null),
    [loginErrorCode],
  );

  return (
    <LayoutComponent.Base
      backgroundColor={theme.colors.black_secondary}
      appBar={{
        iconColor: theme.colors.white,
      }}
    >
      <S.Content
        exit="exit"
        animate="animate"
        initial="initial"
        variants={motions.fadeInAndUp(0.7)}
      >
        {errorMessage ? <S.ErrorBanner>{errorMessage}</S.ErrorBanner> : null}
        <AuthComponent.SocialLogin
          onError={setLoginErrorCode}
          onLoginStart={() => setLoginErrorCode(null)}
        />
        <AuthComponent.CenterFixedLogo />
      </S.Content>
    </LayoutComponent.Base>
  );
};

export default SignInPage;

const S = {
  Content: styled(motion.section)`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.black_secondary};
  `,
  ErrorBanner: styled.p`
    position: absolute;
    left: 30px;
    right: 30px;
    bottom: 208px;
    z-index: 2;
    padding: 12px 14px;
    border: 1px solid #8b4354;
    border-radius: 8px;
    background-color: #2a1a1f;
    color: #ffc8d5;
    font-size: 13px;
    line-height: 1.4;
  `,
};
