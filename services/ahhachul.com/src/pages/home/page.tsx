import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { HomeComponent, LayoutComponent } from '@/components';
import { mixins, theme } from '@/styles';

const HomePage: ActivityComponentType = () => {
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
        <HomeComponent.CommuteCoach />
        <HomeComponent.ServiceHub />
        <HomeComponent.DailyVote />
        <HomeComponent.StoryFeed />
        <HomeComponent.CommunityHotPosts />
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
