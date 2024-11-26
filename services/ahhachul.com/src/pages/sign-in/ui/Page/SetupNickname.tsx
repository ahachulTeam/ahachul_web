import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { NicknameSetup } from 'features/users';
import { Layout } from 'widgets';
import { animateVariants } from 'shared/lib/config/animation/framer-motion';
import cssUtils from 'shared/utils.css';
import {
  useAuthStore,
  useTemporaryAuthStore,
} from 'entities/app-authentications/slice';
import { useMutation } from 'shared/api';
import { useFlow } from 'app/stackflow';
import { GET_USER_INFO_QUERY_KEY, updateUser } from 'features/users/api';
import { queryClient } from 'app/lib/react-query';

export const SetupNickname = () => {
  const { replace } = useFlow();
  const [nickname, setNickname] = useState('');
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value),
    [],
  );

  const { setToken } = useAuthStore();
  const { auth, reset: removeTemporaryAuth } = useTemporaryAuthStore();
  const { mutate: updateUserAndTryLoginProcessDone } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      if (!auth) return;

      const { accessToken, refreshToken } = auth;
      setToken({ accessToken, refreshToken });
      queryClient.invalidateQueries({ queryKey: GET_USER_INFO_QUERY_KEY });
      removeTemporaryAuth();
      alert('로그인 성공');
      replace('Home', {});
    },
    onError: (error) => {
      console.log('API Error on updateUser:', error);
      alert('로그인 정보를 불러오는데 실패했어요.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      // disabled ||
      !auth
    )
      return;
    updateUserAndTryLoginProcessDone({ nickname, auth });
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
