import styled from '@emotion/styled';
import { motion } from 'motion/react';

export const SocialGroup = styled(motion.article)`
  position: absolute;
  left: 0;
  bottom: 34px;

  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 24px 30px 0;
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 50px;
  border-radius: 6px;

  & > span {
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    font-weight: 600;
  }
`;

export const KakaoLogin = styled(SocialButton)`
  background-color: #fee500;
`;

export const GoogleLogin = styled(SocialButton)`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const AppleLogin = styled(SocialButton)`
  background-color: ${({ theme }) => theme.colors.white};
`;
