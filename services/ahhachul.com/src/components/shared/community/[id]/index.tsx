import { useEffect, useState } from 'react';
import { getRandomBoolean } from 'utils/helper';

import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { UiComponent } from 'components';
import { Layout } from 'components/layout';
import { ActivityComponentType } from '@stackflow/react';

const CommunityDetail: ActivityComponentType = () => {
  const [isLoading, setIsLoading] = useState(true);

  const hasImage = getRandomBoolean();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <Layout
      appBar={{
        title: '',
      }}
      activeTab={false}
    >
      <main>
        {isLoading && <UiComponent.Loading opacity={1} />}
        {hasImage ? <DetailWithImage /> : <DetailOnlyText />}
      </main>
    </Layout>
  );
};

export default CommunityDetail;
