import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';

const SubwayNotices: ActivityComponentType = () => {
  const {
    color: { text },
  } = useTheme();

  return (
    <Layout appBar={{ title: 'SubwayNotices' }}>
      <div css={{ color: text[50] }}>SubwayNotices</div>
    </Layout>
  );
};

export default SubwayNotices;
