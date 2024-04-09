import { ComplaintsComponent } from '@/src/components';
import { Layout } from '@/src/components/layout';

export default function Complaint() {
  return (
    <Layout>
      <ComplaintsComponent.ComplaintsMain />
      <ComplaintsComponent.ComplaintList />
    </Layout>
  );
}
