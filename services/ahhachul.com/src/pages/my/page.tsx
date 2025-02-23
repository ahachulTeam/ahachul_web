import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { ChevronIcon } from '@/assets/icons/system';
import { HeaderComponent, LayoutComponent } from '@/components';
import { useFetchSubwayLines } from '@/services/subway';
import { useFetchUserProfile } from '@/services/user';
import { useFlow } from '@/stackflow';

const MyPage: ActivityComponentType = () => {
  const { push } = useFlow();
  const { data } = useFetchSubwayLines();
  const { data: userInfo } = useFetchUserProfile();
  console.log('useFetchSubwayLines data :', data);
  console.log('userInfo data :', userInfo);

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
          console.log('first');
          push('SettingPage', {});
        }}
      >
        <S.Label>즐겨찾는 역 설정</S.Label>
        <ChevronIcon />
      </S.Container>
    </LayoutComponent.Base>
  );
};
const S = {
  Container: styled.div`
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
};

export default MyPage;
