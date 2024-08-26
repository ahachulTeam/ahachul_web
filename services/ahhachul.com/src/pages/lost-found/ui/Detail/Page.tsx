import { Suspense } from 'react';

// import { Layout } from 'components/layout';
import { ActivityComponentType } from '@stackflow/react';
// import { ErrorComponent, SharedComponent, UiComponent } from 'components';

type LostDetailProps = {
  articleId: string;
};

const LostDetail: ActivityComponentType<LostDetailProps> = ({ params: { articleId } }) => {
  return (
    // <Layout
    //   appBar={{
    //     title: '',
    //   }}
    //   activeTab={false}
    // >
    //   <ErrorComponent.QueryErrorBoundary>
    //     <Suspense fallback={<UiComponent.Loading opacity={1} />}>
    //       <SharedComponent.LostDetailMain postId={articleId} />
    //     </Suspense>
    //   </ErrorComponent.QueryErrorBoundary>
    // </Layout>
    <div></div>
  );
};

export default LostDetail;
