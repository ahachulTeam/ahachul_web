// import { Suspense } from 'react';

// import { Layout } from 'components/layout';
// import { ActivityComponentType } from '@stackflow/react';
// import { ErrorComponent, SharedComponent, UiComponent } from 'components';

// type CommunityDetailProps = {
//   articleId: string;
// };

// const CommunityDetail: ActivityComponentType<CommunityDetailProps> = ({ params: { articleId } }) => {
//   return (
//     <Layout
//       appBar={{
//         title: '',
//       }}
//       activeTab={false}
//     >
//       <ErrorComponent.QueryErrorBoundary>
//         <Suspense fallback={<UiComponent.Loading opacity={1} />}>
//           <SharedComponent.CommunityDetailMain postId={articleId} />
//         </Suspense>
//       </ErrorComponent.QueryErrorBoundary>
//     </Layout>
//   );
// };

// export default CommunityDetail;

export {};
