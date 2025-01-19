import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { motion } from 'motion/react';

import { LayoutComponent, AuthComponent } from '@/components';
import { motions } from '@/constants';
import { theme } from '@/styles';

const SignInPage: ActivityComponentType = () => {
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
        <AuthComponent.SocialLogin />
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
};
