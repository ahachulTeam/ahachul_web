import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { HeaderComponent, HomeComponent, LayoutComponent } from '@/components';
import { mixins } from '@/styles';

const HomePage: ActivityComponentType = () => {
  return (
    <LayoutComponent.Base
      navigationSlot
      appBar={{
        overflow: 'visible',
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
    >
      <S.Container>
        <HomeComponent.WelcomeMessage />
      </S.Container>
    </LayoutComponent.Base>
  );
};

const S = {
  Container: styled.div`
    ${mixins.fullWidth};
    ${mixins.flexColumn};
    ${mixins.pagePaddingTop};
    ${mixins.pagePaddingBottom};
  `,
};

export default HomePage;
