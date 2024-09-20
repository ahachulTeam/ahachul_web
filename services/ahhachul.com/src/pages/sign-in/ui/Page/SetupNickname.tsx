import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { NicknameSetup } from 'features/users';
import { Layout } from 'widgets';
import { animateVariants } from 'shared/lib/config/animation/framer-motion';
import cssUtils from 'shared/utils.css';

export const SetupNickname = () => {
  const [nickname, setNickname] = useState('');
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value),
    [],
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('HELLO WORLD');
  };

  return (
    <Layout>
      <Content
        exit="exit"
        animate="animate"
        initial="initial"
        variants={animateVariants(0.7)}
      >
        <NicknameSetup
          nickname={nickname}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          css={cssUtils.sideGutter}
        />
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
