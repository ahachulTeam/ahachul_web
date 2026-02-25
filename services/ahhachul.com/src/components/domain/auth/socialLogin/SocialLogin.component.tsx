import { useState } from 'react';

import { fetchRedirectUrl } from '@/apis/request';
import { GoogleIcon, AppleIcon, KakaoIcon } from '@/assets/icons/auth';
import { motions } from '@/constants';
import { SocialSignInType } from '@/types';
import { resolveLoginErrorCodeFromError, type LoginErrorCode } from '@/utils/loginError';
import { createActionLogger } from '@/utils/observability';

import * as S from './SocialLogin.styled';

interface SocialLoginProps {
  onError?: (errorCode: LoginErrorCode) => void;
  onLoginStart?: () => void;
}

const socialLoginLogger = createActionLogger('social-login');

const SocialLogin = ({ onError, onLoginStart }: SocialLoginProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clickLogin = async (loginType: SocialSignInType) => {
    socialLoginLogger.start('request-redirect-url', {
      loginType,
    });
    onLoginStart?.();
    setIsSubmitting(true);

    try {
      const response = await fetchRedirectUrl(loginType);
      socialLoginLogger.success('request-redirect-url', {
        loginType,
      });
      window.location.assign(response.result.redirectUrl);
    } catch (error) {
      socialLoginLogger.fail(
        'request-redirect-url',
        error,
        {
          loginType,
        },
        '소셜 로그인 페이지로 이동하지 못했습니다.',
      );
      onError?.(resolveLoginErrorCodeFromError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.SocialGroup
      exit="exit"
      animate="animate"
      initial="initial"
      variants={motions.fadeInAndUp(0.3)}
    >
      <S.GoogleLogin disabled={isSubmitting} onClick={() => clickLogin(SocialSignInType.GOOGLE)}>
        <GoogleIcon />
        <span>Google로 계속하기</span>
      </S.GoogleLogin>
      <S.AppleLogin disabled={isSubmitting} onClick={() => clickLogin(SocialSignInType.APPLE)}>
        <AppleIcon />
        <span>Apple로 계속하기</span>
      </S.AppleLogin>
      <S.KakaoLogin disabled={isSubmitting} onClick={() => clickLogin(SocialSignInType.KAKAO)}>
        <KakaoIcon />
        <span>Kakao로 계속하기</span>
      </S.KakaoLogin>
    </S.SocialGroup>
  );
};

export default SocialLogin;
