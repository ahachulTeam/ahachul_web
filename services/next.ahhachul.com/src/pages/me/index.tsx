import { Layout } from '@/src/components/layout';

export default function Me() {
  return (
    <Layout headerType="back" title="내 프로필" nav={false}>
      <p css={{ padding: '14px 20px', color: '#fff' }}>내 프로필 화면</p>
    </Layout>
  );
}
