import { fetchRedirectUrl } from '@/apis/request';
import { GoogleIcon, AppleIcon, KakaoIcon } from '@/assets/icons/auth';
import { motions } from '@/constants';
import { SocialSignInType } from '@/types';

import * as S from './SocialLogin.styled';

const SocialLogin = () => {
  const clickLogin = async (loginType: SocialSignInType) => {
    if (loginType === SocialSignInType.APPLE) {
      const APPLE_CLIENT_ID = 'com.ahhachul.todayapp.login';
      const APPLE_REDIRECT_URI = 'https://app.dev.ahhachul.com/login/callback?type=APPLE';
      const url = `https://appleid.apple.com/auth/authorize?response_type=code&response_mode=form_post&scope=name%20email&client_id=${APPLE_CLIENT_ID}&redirect_uri=${APPLE_REDIRECT_URI}`;

      window.location.assign(url);
      return;
    } else {
      try {
        const response = await fetchRedirectUrl(loginType);
        window.location.assign(response.result.redirectUrl);
      } catch (error) {
        window.alert('로그인 정보를 불러오는데 실패했어요.');
      }
    }
  };

  return (
    <S.SocialGroup
      exit="exit"
      animate="animate"
      initial="initial"
      variants={motions.fadeInAndUp(0.3)}
    >
      <S.GoogleLogin onClick={() => clickLogin(SocialSignInType.GOOGLE)}>
        <GoogleIcon />
        <span>Google로 계속하기</span>
      </S.GoogleLogin>
      <S.AppleLogin onClick={() => clickLogin(SocialSignInType.APPLE)}>
        <AppleIcon />
        <span>Apple로 계속하기</span>
      </S.AppleLogin>
      <S.KakaoLogin onClick={() => clickLogin(SocialSignInType.KAKAO)}>
        <KakaoIcon />
        <span>Kakao로 계속하기</span>
      </S.KakaoLogin>
    </S.SocialGroup>
  );
};

export default SocialLogin;
