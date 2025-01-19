import { ActivityComponentType } from '@stackflow/react';

import { HeaderComponent, LayoutComponent } from '@/components';

const MyPage: ActivityComponentType = () => {
  return (
    <LayoutComponent.Base
      navigationSlot
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
    >
      MyPage
    </LayoutComponent.Base>
  );
};

export default MyPage;
