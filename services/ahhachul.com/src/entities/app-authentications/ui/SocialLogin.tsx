import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { fadeInAndUpVariants } from 'shared/lib/config/animation/framer-motion';

import { useFlow } from 'app/stackflow';
import { useGetSignInRedirectUrl } from '../api';
import { KakaoIcon } from '../static/icons/kakao';
import { GoogleIcon } from '../static/icons/google';

export const SocialLogin = () => {
  const { push } = useFlow();
  const urls = useGetSignInRedirectUrl();
  console.log('urls:', urls);

  const clickLogin = () => push('SetupNickname', {});

  return (
    <SocialGroup
      exit="exit"
      animate="animate"
      initial="initial"
      variants={fadeInAndUpVariants(0.3)}
    >
      <KakaoLogin onClick={clickLogin}>
        <KakaoIcon />
        <span>Kakao로 계속하기</span>
      </KakaoLogin>
      <GoogleLogin onClick={clickLogin}>
        <GoogleIcon />
        <span>Google로 계속하기</span>
      </GoogleLogin>
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
