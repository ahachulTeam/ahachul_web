// import { Suspense } from 'react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { motion } from 'framer-motion';
import { SocialLogin } from 'entities/app-authentications/ui/SocialLogin';
// import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { LogoTypoIcon } from 'entities/app-authentications/static/icons/logo-typo';
import { Layout } from 'widgets';
import { animateVariants } from 'shared/lib/config/animation/framer-motion';
import AppLogo from 'entities/app-authentications/static/img/app-logo.png';

export const SignIn: ActivityComponentType = () => {
  return (
    <Layout>
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
        {/* <QueryErrorBoundary>
          <Suspense fallback={null}> */}
        <SocialLogin />
        {/* </Suspense>
        </QueryErrorBoundary> */}
      </Content>
    </Layout>
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
