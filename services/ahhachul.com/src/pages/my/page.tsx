import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { ChevronIcon } from '@/assets/icons/system';
import { HeaderComponent, LayoutComponent } from '@/components';
import { useFetchSubwayLines } from '@/services/subway';
import { useFetchUserProfile } from '@/services/user';
import { useFlow } from '@/stackflow';

const MyPage: ActivityComponentType = () => {
  useFetchSubwayLines();
  useFetchUserProfile();

  const { push } = useFlow();

  const logoutConfirm = () => {
    // openAlertConfirm('로그아웃', '정말로 로그아웃 하시겠어요?', logout);
  };

  const secessionConfirm = () => {};

  return (
    <LayoutComponent.Base
      navigationSlot
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
    >
      <S.Container
        onClick={() => {
          push('SettingPage', {});
        }}
      >
        <S.Setting>
          <S.Label>즐겨찾는 역 설정</S.Label>
          <ChevronIcon />
        </S.Setting>

        <S.Bottom>
          <span onClick={logoutConfirm}>로그아웃</span>
          <S.Line />
          <span onClick={secessionConfirm}>회원탈퇴</span>
        </S.Bottom>
      </S.Container>
    </LayoutComponent.Base>
  );
};
const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
  `,
  Setting: styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > svg {
      transform: rotate(-90deg);
    }
  `,
  Label: styled.div`
    ${({ theme }) => css`
      ${theme.fonts.bodyLarge};
      font-weight: 700;
      color: ${theme.colors.black};
      position: relative;
    `}
  `,
  Bottom: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1;
    color: #b0b0b0;
    height: 14px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  `,
  Line: styled.span`
    display: inline-block;
    width: 1px;
    height: 100%;
    margin: 0px 14px;
    background-color: #c4c4c4;
  `,
};

export default MyPage;
