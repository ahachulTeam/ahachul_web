import { useEffect } from 'react';
import { getRandomBoolean } from 'utils/helper';

import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { Layout } from 'components/layout';
import { ActivityComponentType } from '@stackflow/react';
import { useLoading } from 'hooks';

type CommunityDetailProps = {
  articleId: string;
};

const CommunityDetail: ActivityComponentType<CommunityDetailProps> = ({ params: { articleId } }) => {
  useLoading();

  const hasImage = getRandomBoolean();

  useEffect(() => {
    console.log('articleId:', articleId);
  }, []);

  return (
    <Layout
      appBar={{
        title: '',
      }}
      activeTab={false}
    >
      <main>{hasImage ? <DetailWithImage /> : <DetailOnlyText />}</main>
    </Layout>
  );
};

export default CommunityDetail;
