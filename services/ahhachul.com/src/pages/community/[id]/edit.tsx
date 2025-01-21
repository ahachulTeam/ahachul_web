/* eslint-disable react/prop-types */
import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent, CommunityComponent, UiComponent } from '@/components';
import type { WithPostId } from '@/types';

const EditCommunityPage: ActivityComponentType<WithPostId> = ({ params: { id } }) => {
  return (
    <LayoutComponent.Base>
      <UiComponent.SuspenseQueryBoundary
        keys={[id]}
        suspenseFallback={<UiComponent.LoadingSpinner isWhite />}
        errorFallback={props => <CommunityComponent.CommunityErrorPage {...props} />}
      >
        <CommunityComponent.EditCommunity id={id} />
      </UiComponent.SuspenseQueryBoundary>
    </LayoutComponent.Base>
  );
};

export default EditCommunityPage;
