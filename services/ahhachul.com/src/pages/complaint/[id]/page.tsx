import { type ActivityComponentType } from '@stackflow/react';

import { LayoutComponent, LostFoundComponent, UiComponent } from '@/components';
import type { WithPostId } from '@/types';

const ComplaintDetailPage: ActivityComponentType<WithPostId> = ({
  params: { id },
}: {
  params: WithPostId;
}) => {
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

export default ComplaintDetailPage;
