import { Layout } from '@/src/components/layout';
import withAuth from '@/src/hooks/withAuth';

function Me() {
  return (
    <Layout headerType="back" title="내 프로필" nav={false}>
      <p css={{ padding: '14px 20px', color: '#fff' }}>내 프로필 화면</p>
    </Layout>
  );
}

export default withAuth(Me);
