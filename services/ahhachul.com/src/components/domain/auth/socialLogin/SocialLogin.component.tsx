import { fetchRedirectUrl } from '@/apis/request';
import { GoogleIcon, AppleIcon, KakaoIcon } from '@/assets/icons/auth';
import { motions } from '@/constants';
import { SocialSignInType } from '@/types';

import * as S from './SocialLogin.styled';

const SocialLogin = () => {
  const clickLogin = async (loginType: SocialSignInType) => {
    try {
      const data = await fetchRedirectUrl(loginType);
      window.location.assign(data.result.redirectUrl);
    } catch (error) {
      window.alert('로그인 정보를 불러오는데 실패했어요.');
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
