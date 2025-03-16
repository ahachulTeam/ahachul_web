import { ActivityComponentType } from '@stackflow/react';

import { HeaderComponent, LayoutComponent, UiComponent } from '@/components';
import { ComplaintPanel } from '@/components/domain/complaint';

const ComplaintListPage: ActivityComponentType = () => {
  return (
    <LayoutComponent.Base
      navigationSlot
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
    >
      <ComplaintPanel />
      <UiComponent.NewButton
        type="list"
        label="실시간 민원"
        activityName="ComplaintPage"
        checkAuth={false}
        replace
      />
    </LayoutComponent.Base>
  );
};

export default ComplaintListPage;
