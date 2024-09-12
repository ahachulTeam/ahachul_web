import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { animateVariants } from 'shared/lib/config/animation/framer-motion';

import { useGetSignInRedirectUrl } from '../api';

import AppLogo from '../static/img/app-logo.png';
import { KakaoIcon } from '../static/icons/kakao';
import { GoogleIcon } from '../static/icons/google';
import { LogoTypoIcon } from '../static/icons/logo-typo';

export const SocialLogin = () => {
  const urls = useGetSignInRedirectUrl();
  console.log('urls:', urls);

  return (
    <Content
      exit="exit"
      animate="animate"
      initial="initial"
      variants={animateVariants(0.7)}
    >
      <CenterLogoGroup>
        <img src={AppLogo} alt="ahhachul-app-logo" />
        <div>
          <span>더 편한 지하철을 만드는</span>
          <LogoTypoIcon />
        </div>
      </CenterLogoGroup>
      <SocialGroup>
        <KakaoLogin>
          <KakaoIcon />
          <span>Kakao로 계속하기</span>
        </KakaoLogin>
        <GoogleLogin>
          <GoogleIcon />
          <span>Google로 계속하기</span>
        </GoogleLogin>
      </SocialGroup>
    </Content>
  );
};

const Content = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.background[50]};
`;

const CenterLogoGroup = styled.div`
  position: absolute;
  top: 17.8%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;

  & > img {
    width: 64px;
    height: 64px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    & > span {
      color: ${({ theme }) => theme.color.text[50]};
      font-size: 16px;
    }
  }
`;

const SocialGroup = styled.article`
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
