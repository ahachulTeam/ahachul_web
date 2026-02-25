import { useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { useQueryClient } from '@tanstack/react-query';

import { API_PATHS } from '@ahhachul/http';
import { maskEmail, normalizeInputText, validateNickname } from '@ahhachul/utils';

import axiosInstance from '@/apis/fetcher';
import { updateUser } from '@/apis/request';
import { ChevronIcon } from '@/assets/icons/system';
import CameraImg from '@/assets/images/icon_camera.png';
import { LayoutComponent } from '@/components';
import { Avatar } from '@/components/common/avatar/Avatar.component';
import { useAuth } from '@/contexts';
import { useToast } from '@/hooks/useToast';
import { useFetchUserProfile, userKeys } from '@/services/user';
import { useFlow } from '@/stackflow';
import type { ApiResponse } from '@/types';
import { createActionLogger, resolveClientErrorMessage } from '@/utils/observability';

const MyAccountPage: ActivityComponentType = () => {
  const accountLogger = createActionLogger('my-account');
  const { addToast } = useToast();
  const { push } = useFlow();
  const queryClient = useQueryClient();
  const { isCheckingAuthState, authService } = useAuth();
  const { data: userInfo, isLoading } = useFetchUserProfile();
  const [isUpdatingNickname, setIsUpdatingNickname] = useState(false);

  const showToast = () => addToast('준비중인 기능입니다.', 'info');
  const handleLogout = () => {
    authService.logout();
    addToast('로그아웃되었습니다.', 'success');
  };

  const handleNicknameEdit = async () => {
    const currentNickname = userInfo?.result?.nickname ?? '';
    const input = window.prompt('변경할 닉네임을 입력해주세요.', currentNickname);
    if (input === null) {
      return;
    }

    const validation = validateNickname(input);
    if (!validation.isValid) {
      addToast(validation.message, 'error');
      return;
    }

    const nextNickname = validation.normalized;
    if (normalizeInputText(currentNickname) === nextNickname) {
      addToast('기존 닉네임과 동일합니다.', 'info');
      return;
    }

    const accessToken = authService.accessToken;
    const refreshToken = authService.refreshToken;
    if (!accessToken || !refreshToken) {
      addToast('로그인이 필요합니다.', 'error');
      return;
    }

    setIsUpdatingNickname(true);
    try {
      const { data } = await axiosInstance.post<
        ApiResponse<{ available: boolean }> & { payload?: boolean }
      >(API_PATHS.user.checkNickname, {
        nickname: nextNickname,
      });

      const isAvailable = data.result?.available ?? !data.payload;
      if (!isAvailable) {
        addToast('중복인 닉네임이라 사용할 수 없습니다.', 'error');
        return;
      }

      await updateUser({
        nickname: nextNickname,
        auth: {
          accessToken,
          refreshToken,
        },
      });

      await queryClient.invalidateQueries({ queryKey: userKeys.info() });
      accountLogger.success('edit-nickname', {
        nicknameLength: nextNickname.length,
      });
      addToast('닉네임이 변경되었습니다.', 'success');
    } catch (error) {
      const userMessage = resolveClientErrorMessage(
        error,
        '닉네임 변경에 실패했습니다. 잠시 후 다시 시도해주세요.',
      );
      accountLogger.fail(
        'edit-nickname',
        error,
        {
          currentNicknameLength: currentNickname.length,
          nextNicknameLength: nextNickname.length,
        },
        userMessage,
      );
      addToast(userMessage, 'error');
    } finally {
      setIsUpdatingNickname(false);
    }
  };

  if (isLoading || isCheckingAuthState) return null;

  const handleOpenProfile = (mode: 'default' | 'settings' | 'preview') => {
    const nickname = userInfo?.result?.nickname;
    if (!nickname) {
      addToast('프로필 정보를 찾을 수 없습니다.', 'error');
      return;
    }

    if (mode === 'settings') {
      push('UserProfileSettingPage', { username: nickname });
      return;
    }

    if (mode === 'preview') {
      push('UserProfilePreviewPage', { username: nickname });
      return;
    }

    push('UserProfilePage', { username: nickname });
  };

  return (
    <LayoutComponent.Base>
      <Wrapper>
        <FlexCenter>
          <AvatarWrapper>
            <Avatar src={userInfo?.result?.imageUrl} size={80} />
            <UploadIcon>
              <img src={CameraImg} alt="CameraImg" />
            </UploadIcon>
          </AvatarWrapper>
        </FlexCenter>

        <Fields>
          <div>
            <p className="main">이메일</p>
            <p className="secondary">
              {maskEmail(userInfo?.result?.maskedEmail ?? userInfo?.result?.email) || '-'}
            </p>
          </div>
          <div onClick={isUpdatingNickname ? undefined : handleNicknameEdit}>
            <p className="main">닉네임</p>
            <div>
              <p className="secondary">
                {isUpdatingNickname ? '변경 중...' : userInfo?.result?.nickname}
              </p>
              <ChevronIcon />
            </div>
          </div>
          <div onClick={showToast}>
            <p className="main">비밀번호 변경</p>
            <ChevronIcon />
          </div>
          <div onClick={() => handleOpenProfile('default')}>
            <p className="main">내 프로필</p>
            <ChevronIcon />
          </div>
          <div onClick={() => handleOpenProfile('settings')}>
            <p className="main">프로필 공개 설정</p>
            <ChevronIcon />
          </div>
          <div onClick={() => handleOpenProfile('preview')}>
            <p className="main">프로필 미리보기</p>
            <ChevronIcon />
          </div>
          <Divider />
          <RemoveAccountCard>
            <span
              css={css`
                font-size: 14px;
                font-weight: 500;
                margin-right: 8px;
                color: var(--ah-color-legacy-text-muted-secondary);
              `}
              onClick={showToast}
            >
              아하철 앱 계정 탈퇴
            </span>
            <ChevronIcon />
          </RemoveAccountCard>
        </Fields>

        <LogoutButtonWrapper>
          <button
            className="square"
            onClick={handleLogout}
            css={css`
              padding: 16px;
              color: var(--ah-color-legacy-text-slate);
              border: 1px solid var(--ah-color-legacy-border-muted);
            `}
          >
            로그아웃
          </button>
        </LogoutButtonWrapper>
      </Wrapper>
    </LayoutComponent.Base>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 24px 0px 20px;
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const UploadIcon = styled.div`
  background-color: transparent;

  & > img {
    width: 30px;
    height: 30px;
  }

  position: absolute;
  top: 50px;
  left: 50px;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;

    & > svg {
      transform: rotate(270deg);
    }
  }

  div > div {
    display: flex;
    align-items: center;

    p {
      margin-right: 8px;
    }

    & > svg {
      transform: rotate(270deg);
    }
  }

  p.main {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: var(--ah-color-legacy-text-strong);
  }

  p.secondary {
    font-size: 16px;
    color: var(--ah-color-legacy-text-muted);
  }
`;

const LogoutButtonWrapper = styled.div`
  display: flex;
  padding: 0 20px;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 40px;
`;

const RemoveAccountCard = styled.div`
  height: 48px !important;
  display: flex;
  justify-content: flex-start !important;
  align-items: center;

  & > svg {
    transform: rotate(270deg);

    & > g > path {
      fill: var(--ah-color-legacy-text-muted-secondary);
    }
  }
`;

const Divider = styled.span`
  border-top: 1px solid var(--ah-color-legacy-border-muted);
  margin: 16px 0;
`;

export default MyAccountPage;
