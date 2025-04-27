import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { ChevronIcon } from '@/assets/icons/system';
import { HeaderComponent, LayoutComponent } from '@/components';
import { useToast } from '@/hooks/useToast';
import { useFetchSubwayLines } from '@/services/subway';
import { useFetchUserProfile } from '@/services/user';
import { useFlow } from '@/stackflow';

const MyPage: ActivityComponentType = () => {
  useFetchSubwayLines();
  useFetchUserProfile();

  const { push } = useFlow();
  const { addToast } = useToast();

  // const logoutConfirm = () => {
  //   // openAlertConfirm('로그아웃', '정말로 로그아웃 하시겠어요?', logout);
  // };

  // const secessionConfirm = () => {};

  const showToast = () => addToast('준비중인 기능입니다.', 'info');

  return (
    <LayoutComponent.Base
      navigationSlot
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
    >
      <S.Container>
        <S.SettingList>
          <S.Setting
            onClick={() => {
              push('SettingPage', {});
            }}
          >
            <S.Label>즐겨찾는 역 설정</S.Label>
            <ChevronIcon />
          </S.Setting>
          <S.Setting onClick={showToast}>
            <S.Label>공지사항</S.Label>
            <ChevronIcon />
          </S.Setting>
          <S.Setting onClick={showToast}>
            <S.Label>문의사항</S.Label>
            <ChevronIcon />
          </S.Setting>
          <S.Setting onClick={showToast}>
            <S.Label>약관 및 정책</S.Label>
            <ChevronIcon />
          </S.Setting>
        </S.SettingList>

        <S.Bottom>
          <span onClick={showToast}>로그아웃</span>
          <S.Line />
          <span onClick={showToast}>회원탈퇴</span>
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
  SettingList: styled.ul`
    & > li:not(:last-of-type) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
    }
  `,
  Setting: styled.li`
    padding: 16px 20px;
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
    bottom: 32px;
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
