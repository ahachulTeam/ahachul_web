import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { AnimatePortal } from 'shared/ui/Portal';
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
    <AnimatePortal isShowing mode="sync">
      <Overlay>
        <Content
          exit="exit"
          animate="animate"
          initial="initial"
          variants={animateVariants}
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
      </Overlay>
    </AnimatePortal>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: unset;
  z-index: 100000;
`;

const Content = styled(motion.dialog)`
  position: relative;
  display: block;
  border: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #141517;
  z-index: 10000000;
`;

const CenterLogoGroup = styled.div`
  position: absolute;
  top: 30%;
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
      color: #ffffff;
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
  padding: 24px 30px;
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
    color: #000000;
    font-size: 16px;
    font-weight: 600;
  }
`;
const KakaoLogin = styled(SocialButton)`
  background-color: #fee500;
`;
const GoogleLogin = styled(SocialButton)`
  background-color: #ffffff;
`;
