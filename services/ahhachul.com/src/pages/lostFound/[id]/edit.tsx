/* eslint-disable react/prop-types */
import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent, LostFoundComponent, UiComponent } from '@/components';
import type { WithPostId } from '@/types';

const EditLostFoundPage: ActivityComponentType<WithPostId> = ({ params: { id } }) => {
  return (
    <LayoutComponent.Base>
      <UiComponent.SuspenseQueryBoundary
        keys={[id]}
        suspenseFallback={<UiComponent.LoadingSpinner isWhite />}
        errorFallback={props => <LostFoundComponent.LostFoundErrorPage {...props} />}
      >
        <LostFoundComponent.EditLostFound id={id} />
      </UiComponent.SuspenseQueryBoundary>
    </LayoutComponent.Base>
  );
};

export default EditLostFoundPage;
