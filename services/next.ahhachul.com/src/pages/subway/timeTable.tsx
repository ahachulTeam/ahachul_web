import { Layout } from '@/src/components/layout';

export default function SubwayTimeTable() {
  return (
    <Layout headerType="back" title="지하철 시간표" nav={false}>
      <p css={{ padding: '14px 20px', color: '#fff' }}>지하철 시간표 화면</p>
    </Layout>
  );
}
