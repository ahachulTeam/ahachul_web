import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { ChevronIcon } from '@/assets/icons/system';
import CameraImg from '@/assets/images/icon_camera.png';
import { LayoutComponent } from '@/components';
import { Avatar } from '@/components/common/avatar/Avatar.component';
import { useAuth } from '@/contexts';
import { useToast } from '@/hooks/useToast';
import { useFetchUserProfile } from '@/services/user';

const MyAccountPage: ActivityComponentType = () => {
  const { addToast } = useToast();
  const { isCheckingAuthState } = useAuth();
  const { data: userInfo, isLoading } = useFetchUserProfile();

  const showToast = () => addToast('준비중인 기능입니다.', 'info');

  if (isLoading || isCheckingAuthState) return null;

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
            <p className="secondary">{userInfo?.result?.email ?? '-'}</p>
          </div>
          <div onClick={showToast}>
            <p className="main">닉네임</p>
            <div>
              <p className="secondary">{userInfo?.result?.nickname}</p>
              <ChevronIcon />
            </div>
          </div>
          <div onClick={showToast}>
            <p className="main">비밀번호 변경</p>
            <ChevronIcon />
          </div>
          <Divider />
          <RemoveAccountCard>
            <span
              css={css`
                font-size: 14px;
                font-weight: 500;
                margin-right: 8px;
                color: #838791;
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
            css={css`
              padding: 16px;
              color: #515458;
              border: 1px solid #e1e6ed;
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
    color: #26282b;
  }

  p.secondary {
    font-size: 16px;
    color: #70747d;
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
      fill: #838791;
    }
  }
`;

const Divider = styled.span`
  border-top: 1px solid #e1e6ed;
  margin: 16px 0;
`;

export default MyAccountPage;
