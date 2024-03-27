import { useEffect, useState } from 'react';
import { getRandomBoolean } from 'mocks/utils';

import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { useGetCommunityDetail } from 'queries/community/useGetCommunityDetail';

type CommunityDetailMainProps = {
  postId: string;
};

const CommunityDetailMain = ({ postId }: CommunityDetailMainProps) => {
  const { data } = useGetCommunityDetail(postId);
  const hasImage = getRandomBoolean();
  const [nickname, setNickname] = useState('');

  console.log('data:', data);

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

  return <main>{hasImage ? <DetailWithImage nickname={nickname} /> : <DetailOnlyText nickname={nickname} />}</main>;
};

export default CommunityDetailMain;
