import { type ActivityComponentType } from '@stackflow/react';

import { ComplaintComponent, LayoutComponent, UiComponent } from '@/components';
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
        suspenseFallback={<ComplaintComponent.ComplaintDetailSkeleton />}
        errorFallback={props => <ComplaintComponent.ComplaintErrorPage {...props} />}
      >
        <ComplaintComponent.ComplaintDetail id={id} />
      </UiComponent.SuspenseQueryBoundary>
    </LayoutComponent.Base>
  );
};

export default ComplaintDetailPage;
