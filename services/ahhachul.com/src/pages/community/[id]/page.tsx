import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent, UiComponent, CommunityComponent } from '@/components';
import type { WithPostId } from '@/types';

const CommunityDetailPage: ActivityComponentType<WithPostId> = ({
  params: { id },
}: {
  params: WithPostId;
}) => {
  return (
    <LayoutComponent.Base>
      <UiComponent.SuspenseQueryBoundary
        keys={[id]}
        suspenseFallback={<CommunityComponent.CommunityDetailSkeleton />}
        errorFallback={props => <CommunityComponent.CommunityErrorPage {...props} />}
      >
        <CommunityComponent.CommunityDetail id={id} />
      </UiComponent.SuspenseQueryBoundary>
    </LayoutComponent.Base>
  );
};

export default CommunityDetailPage;
