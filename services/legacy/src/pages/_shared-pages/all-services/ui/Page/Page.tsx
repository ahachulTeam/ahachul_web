import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';

const AllServices: ActivityComponentType = () => {
  const {
    dimensions: {
      size: { gutter },
    },
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: '전체 서비스' }}>
      <div css={{ padding: gutter, color: text[50] }}>전체 서비스</div>
    </Layout>
  );
};

export default AllServices;
