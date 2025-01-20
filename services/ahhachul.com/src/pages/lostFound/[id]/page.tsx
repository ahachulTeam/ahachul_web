/* eslint-disable react/prop-types */
import { type ActivityComponentType } from '@stackflow/react';

import { LayoutComponent, LostFoundComponent, UiComponent } from '@/components';
import type { WithPostId } from '@/types';

const LostFoundDetailPage: ActivityComponentType<WithPostId> = ({ params: { id } }) => {
  return (
    <LayoutComponent.Base>
      <UiComponent.SuspenseQueryBoundary
        keys={[id]}
        suspenseFallback={<LostFoundComponent.LostFoundDetailSkeleton />}
        errorFallback={props => <LostFoundComponent.LostFoundErrorPage {...props} />}
      >
        <LostFoundComponent.LostFoundDetail id={id} />
      </UiComponent.SuspenseQueryBoundary>
    </LayoutComponent.Base>
  );
};

export default LostFoundDetailPage;
