import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { HomeComponent, LayoutComponent } from '@/components';
import { useInitialLoader } from '@/hooks/domain/home/useInitialLoader';
import { mixins, theme } from '@/styles';

const HomePage: ActivityComponentType = () => {
  useInitialLoader();

  return (
    <LayoutComponent.Base
      navigationSlot
      backgroundColor={theme.colors.gray[100]}
      appBar={{
        overflow: 'visible',
        renderLeft: HomeComponent.HomeHeaderActions,
        renderRight: HomeComponent.HomeHeaderRightActions,
      }}
    >
      <S.Container>
        <HomeComponent.WelcomeMessage />
        <HomeComponent.Stations />
        <HomeComponent.SubwayNews />
        <HomeComponent.RankHashtag />
      </S.Container>
    </LayoutComponent.Base>
  );
};

const S = {
  Container: styled.div`
    ${mixins.fullWidth};
    ${mixins.flexColumn};
    ${mixins.pagePaddingTop};
  `,
};

export default HomePage;
