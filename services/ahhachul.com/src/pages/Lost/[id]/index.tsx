import { Suspense, useEffect, useState } from 'react';

import { Layout } from 'components/layout';
import { ActivityComponentType } from '@stackflow/react';
import { ErrorComponent, SharedComponent, UiComponent } from 'components';

type LostDetailProps = {
  articleId: string;
};

const LostDetail: ActivityComponentType<LostDetailProps> = ({ params: { articleId } }) => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const getRandomNickname = () => {
      const list = [
        '갯나리',
        '특삼',
        '미호밍',
        '플락',
        '도롱뇽',
        '큐이',
        '선바',
        '김츠유',
        '수련수련',
        '한동숙',
        '짬바',
        '리끼',
        '따효니',
        '아리사',
        '녹두로',
        '룩삼',
      ];
      const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
      return list[randomIdx];
    };
    setNickname(getRandomNickname());
  }, []);

  return (
    <Layout
      appBar={{
        title: nickname,
      }}
      activeTab={false}
    >
      <ErrorComponent.QueryErrorBoundary>
        <Suspense fallback={<UiComponent.Loading opacity={1} />}>
          <SharedComponent.LostDetailMain postId={articleId} />
        </Suspense>
      </ErrorComponent.QueryErrorBoundary>
    </Layout>
  );
};

export default LostDetail;
