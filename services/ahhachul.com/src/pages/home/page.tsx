import { useEffect } from 'react';

import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { HomeComponent, LayoutComponent } from '@/components';
import { mixins, theme } from '@/styles';

const HomePage: ActivityComponentType = () => {
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';

      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, []);

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
