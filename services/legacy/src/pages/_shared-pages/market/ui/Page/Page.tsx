import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';

const Market: ActivityComponentType = () => {
  const {
    dimensions: {
      size: { gutter },
    },
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: '중고거래' }}>
      <div css={{ padding: gutter, color: text[50] }}>중고거래</div>
    </Layout>
  );
};

export default Market;
