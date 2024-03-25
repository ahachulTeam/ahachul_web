import { useEffect, useState } from 'react';
import { getRandomBoolean } from 'utils/helper';

import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { Layout } from 'components/layout';
import { ActivityComponentType } from '@stackflow/react';

type CommunityDetailProps = {
  articleId: string;
};

const CommunityDetail: ActivityComponentType<CommunityDetailProps> = ({ params: { articleId } }) => {
  const hasImage = getRandomBoolean();
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
    console.log('articleId:', articleId);
  }, []);

  return (
    <Layout
      appBar={{
        title: nickname,
      }}
      activeTab={false}
    >
      <main>{hasImage ? <DetailWithImage nickname={nickname} /> : <DetailOnlyText nickname={nickname} />}</main>
    </Layout>
  );
};

export default CommunityDetail;
