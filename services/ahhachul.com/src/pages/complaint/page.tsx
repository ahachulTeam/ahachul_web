import { ActivityComponentType } from '@stackflow/react';

import { HeaderComponent, LayoutComponent } from '@/components';

const ComplaintPage: ActivityComponentType = () => {
  return (
    <LayoutComponent.Base
      navigationSlot
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
    >
      {/* <GridComplaintCardSection css={styles.layout} /> */}
      ComplaintPage
    </LayoutComponent.Base>
  );
};

export default ComplaintPage;
