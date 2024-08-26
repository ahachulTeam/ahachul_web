// import { Suspense } from 'react';

// import { Layout } from 'components/layout';
// import { ActivityComponentType } from '@stackflow/react';
// import { ErrorComponent, SharedComponent, UiComponent } from 'components';

// type ComplaintDetailProps = {
//   articleId: string;
// };

// const ComplaintDetail: ActivityComponentType<ComplaintDetailProps> = ({ params: { articleId } }) => {
//   return (
//     <Layout
//       appBar={{
//         title: '',
//       }}
//       activeTab={false}
//     >
//       <ErrorComponent.QueryErrorBoundary>
//         <Suspense fallback={<UiComponent.Loading opacity={1} />}>
//           <SharedComponent.ComplaintDetailMain postId={articleId} />
//         </Suspense>
//       </ErrorComponent.QueryErrorBoundary>
//     </Layout>
//   );
// };

// export default ComplaintDetail;

export {};
