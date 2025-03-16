import { NoticeGraphic } from '@/assets/graphics';
import { useAuth } from '@/contexts';
import { useFetchUserProfile } from '@/services/user';
import { StackFlow } from '@/stackflow';

import * as S from './RankHashtag.styled';

interface Hashtag {
  id: number;
  title: string;
  upRank?: number;
  downRank?: number;
}

const MOCK_RANKING: Hashtag[] = [
  {
    id: 0,
    title: '1호선 빌런',
    upRank: 4,
    downRank: 3,
  },
  {
    id: 1,
    title: '2호선 연착',
    upRank: 2,
    downRank: 3,
  },
  {
    id: 2,
    title: '짠테크',
    upRank: 5,
    downRank: 3,
  },
  {
    id: 3,
    title: '데일리뉴스',
    upRank: 9,
    downRank: 3,
  },
  {
    id: 4,
    title: '다이소',
    upRank: 18,
    downRank: 3,
  },
];

const RankHashtag = () => {
  const { isCheckingAuthState } = useAuth();
  const { isLoading } = useFetchUserProfile();

  if (isLoading || isCheckingAuthState) return null;

  return (
    <S.Container>
      <b>인기 해시태그</b>
      <S.HashtagList>
        <S.TopRankBox>
          <b>#1호선 빌런</b>
          <span>오늘의 인기 태그 1위!</span>
          <NoticeGraphic />
        </S.TopRankBox>
        <S.RankList>
          {MOCK_RANKING.map((item, idx) => (
            <StackFlow.Link
              key={item.id}
              activityName="HashtagPage"
              activityParams={{ keyword: item.title }}
            >
              <S.RankContent>
                <div>
                  <span>{idx + 1}</span>
                  <b>{item.title}</b>
                </div>
                <span>{'-'}</span>
              </S.RankContent>
            </StackFlow.Link>
          ))}
        </S.RankList>
      </S.HashtagList>
    </S.Container>
  );
};

export default RankHashtag;
