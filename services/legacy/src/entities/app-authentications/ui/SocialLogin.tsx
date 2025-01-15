import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { fadeInAndUpVariants } from 'shared/lib/config/animation/framer-motion';

import { getRedirectUrl } from '../api';
import type { ISocialSignInType } from '../model';
import { AppleIcon } from '../static/icons/apple';
import { GoogleIcon } from '../static/icons/google';
import { KakaoIcon } from '../static/icons/kakao';

export const SocialLogin = () => {
  const clickLogin = async (loginType: ISocialSignInType) => {
    try {
      const res = await getRedirectUrl({ providerType: loginType });
      window.location.assign(res.data.result.redirectUrl);
    } catch (error) {
      window.alert('로그인 정보를 불러오는데 실패했어요. (unknown)');
    }
  };

  return (
    <SocialGroup
      exit="exit"
      animate="animate"
      initial="initial"
      variants={fadeInAndUpVariants(0.3)}
    >
      <GoogleLogin onClick={() => clickLogin('GOOGLE')}>
        <GoogleIcon />
        <span>Google로 계속하기</span>
      </GoogleLogin>
      <GoogleLogin onClick={() => clickLogin('APPLE')}>
        <AppleIcon />
        <span>Apple로 계속하기</span>
      </GoogleLogin>
      <KakaoLogin onClick={() => clickLogin('KAKAO')}>
        <KakaoIcon />
        <span>Kakao로 계속하기</span>
      </KakaoLogin>
    </SocialGroup>
  );
};

const SocialGroup = styled(motion.article)`
  position: absolute;
  left: 0;
  bottom: 34px;

  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 24px 30px 0;
`;
const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 50px;
  border-radius: 6px;

  & > span {
    color: ${({ theme }) => theme.color.background[50]};
    font-size: 16px;
    font-weight: 600;
  }
`;
const KakaoLogin = styled(SocialButton)`
  background-color: #fee500;
`;
const GoogleLogin = styled(SocialButton)`
  background-color: ${({ theme }) => theme.color.text[50]};
`;
