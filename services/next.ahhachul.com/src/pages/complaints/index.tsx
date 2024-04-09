import { ComplaintsComponent } from '@/src/components';
import { Layout } from '@/src/components/layout';

export default function Complaint() {
  return (
    <Layout headerType="default">
      <ComplaintsComponent.ComplaintsMain />
      <ComplaintsComponent.ComplaintList />
    </Layout>
  );
}
