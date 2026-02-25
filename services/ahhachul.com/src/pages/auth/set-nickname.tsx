import { useCallback, useState } from 'react';

import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { type Variants as MotionVariantsType } from 'motion/react';
import { motion } from 'motion/react';

import { updateUser } from '@/apis/request';
import { LayoutComponent } from '@/components';
import { NicknameSetup } from '@/components/domain/auth/nickname/NicknameSetup';
import { useAuth } from '@/contexts';
import { useToast } from '@/hooks/useToast';
import { useFlow } from '@/stackflow';
import { useTempAuth } from '@/stores';
import { mixins } from '@/styles';
import { createActionLogger, resolveClientErrorMessage } from '@/utils/observability';

const defaultEasing = [0.6, -0.05, 0.01, 0.99];

const animateVariants = (duration = 0.3): MotionVariantsType => ({
  initial: {
    opacity: 0,
    transition: { duration, ease: defaultEasing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration, ease: defaultEasing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration, ease: defaultEasing },
    willChange: 'opacity',
  },
});

const SetNickNamePage = () => {
  const setNicknameLogger = createActionLogger('set-nickname-page');
  const { addToast } = useToast();

  const { replace } = useFlow();
  const [nickname, setNickname] = useState('');
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value),
    [],
  );

  const { authService } = useAuth();
  const { tempTokens, clearTempTokens } = useTempAuth();
  const { mutate: updateUserAndTryLoginProcessDone } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      if (!tempTokens) return;

      const { accessToken, refreshToken } = tempTokens;
      authService.signIn({ accessToken, refreshToken });
      clearTempTokens();
      addToast('로그인을 성공했어요', 'success');
      replace('HomePage', {}, { animate: false });
    },
    onError: error => {
      const message = resolveClientErrorMessage(error, '로그인 정보를 불러오는데 실패했어요.');
      setNicknameLogger.fail('update-user', error, undefined, message);
      window.alert(message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tempTokens?.accessToken) {
      setNicknameLogger.warn('submit-without-access-token');
      return;
    }
    updateUserAndTryLoginProcessDone({ nickname, auth: tempTokens });
  };

  return (
    <LayoutComponent.Base>
      <Content exit="exit" animate="animate" initial="initial" variants={animateVariants(0.7)}>
        <NicknameSetup
          nickname={nickname}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          css={mixins.sideGutter}
        />
      </Content>
    </LayoutComponent.Base>
  );
};

const Content = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default SetNickNamePage;
