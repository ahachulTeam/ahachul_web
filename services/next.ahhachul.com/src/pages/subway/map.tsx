import { Layout } from '@/src/components/layout';

export default function SubwayMap() {
  return (
    <Layout headerType="back" title="나만의 역 등록" nav={false}>
      <p css={{ padding: '14px 20px', color: '#fff' }}>나만의 역 등록 화면</p>
    </Layout>
  );
}
