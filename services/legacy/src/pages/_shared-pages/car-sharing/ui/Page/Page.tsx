import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';

const CarSharing: ActivityComponentType = () => {
  const {
    dimensions: {
      size: { gutter },
    },
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: '카셰어링' }}>
      <div css={{ padding: gutter, color: text[50] }}>카셰어링</div>
    </Layout>
  );
};

export default CarSharing;
