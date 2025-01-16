import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent } from '@/components';
import { SocialLogin, CenterFixedLogo } from '@/components/domain/auth';

const LoginPage: ActivityComponentType = () => {
  return (
    <LayoutComponent.Base>
      <Content exit="exit" animate="animate" initial="initial" variants={animateVariants(0.7)}>
        <SocialLogin />
        <CenterFixedLogo />
      </Content>
    </LayoutComponent.Base>
  );
};

export default LoginPage;

const Content = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.background[50]};
`;
