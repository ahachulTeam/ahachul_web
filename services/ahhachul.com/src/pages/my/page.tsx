import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { HeaderComponent, LayoutComponent } from '@/components';
import ArticleHistoryCard from '@/components/domain/my/ArticleHistoryCard.component';
import FavoriteRouteCard from '@/components/domain/my/FavoriteRouteCard.component';
import MenuSections from '@/components/domain/my/MenuSections.component';
import RequestCard from '@/components/domain/my/RequestCard.component';
import UserProfile from '@/components/domain/my/UserProfile.component';
import { useFetchSubwayLines } from '@/services/subway';
import { useFetchUserProfile } from '@/services/user';

const MyPage: ActivityComponentType = () => {
  useFetchSubwayLines();
  useFetchUserProfile();

  return (
    <LayoutComponent.Base
      navigationSlot
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
    >
      <S.Container>
        <S.Wrapper>
          <UserProfile />
          <RequestCard />
          <FavoriteRouteCard />
          <ArticleHistoryCard />
          <MenuSections />
        </S.Wrapper>
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
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 0 20px;
  `,
};

export default MyPage;
