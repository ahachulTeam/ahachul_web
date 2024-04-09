import { Layout } from '@/src/components/layout';

export default function AllServices() {
  return (
    <Layout headerType="back" title="전체 서비스" nav={false}>
      <p css={{ padding: '14px 20px', color: '#fff' }}>전체 서비스 화면</p>
    </Layout>
  );
}
