import { subwayIconMap } from '@/constants';
import { useAuth } from '@/contexts';
import { useFetchUserProfile } from '@/services/user';
import { StackFlow } from '@/stackflow';

import * as S from './SubwayNews.styled';

interface SubwayNews {
  id: number;
  title: string;
  lineNumber: number;
  timeElapsed: string;
  thumbnailUrl?: string;
}

const MOCK_NEWS: SubwayNews[] = [
  {
    id: 1,
    title: '한밤 내복차림 지하철역 헤매던 90대…‘이것’ 때문에 무사 귀가한밤 내복차림',
    lineNumber: 2,
    timeElapsed: '2분 전',
    thumbnailUrl:
      'https://ahhachul-api-dev-bucket.s3.ap-northeast-2.amazonaws.com/230fd7b7-0614-4b9a-95af-d9bc01640ddd',
  },
  {
    id: 2,
    title: '尹선고일 빌딩 옥상 출입통제…지하철 물품보관함 폐쇄 검토',
    lineNumber: 5,
    timeElapsed: '2분 전',
  },
  {
    id: 3,
    title: '"지하철에서 \'몰래 촬영\' 처벌...여자 만날 때 과거 알려야 하니"',
    lineNumber: 9,
    timeElapsed: '2분 전',
    thumbnailUrl:
      'https://ahhachul-api-dev-bucket.s3.ap-northeast-2.amazonaws.com/230fd7b7-0614-4b9a-95af-d9bc01640ddd',
  },
  {
    id: 4,
    title: '구리도시공사, 지하철 8호선 구리구간 역사 안전점검 실시',
    lineNumber: 18,
    timeElapsed: '2분 전',
    thumbnailUrl:
      'https://ahhachul-api-dev-bucket.s3.ap-northeast-2.amazonaws.com/230fd7b7-0614-4b9a-95af-d9bc01640ddd',
  },
  {
    id: 5,
    title: '4호선 지하철 열차 안 10대 흉기 자해...응구조부서 119 긴급',
    lineNumber: 4,
    timeElapsed: '2분 전',
    thumbnailUrl:
      'https://ahhachul-api-dev-bucket.s3.ap-northeast-2.amazonaws.com/230fd7b7-0614-4b9a-95af-d9bc01640ddd',
  },
];

const SubwayNews = () => {
  const { isCheckingAuthState } = useAuth();
  const { isLoading } = useFetchUserProfile();

  if (isLoading || isCheckingAuthState) return null;

  return (
    <S.SubwayNews>
      <b>실시간 지하철 뉴스</b>
      <S.NewsList>
        {MOCK_NEWS.map(news => (
          <StackFlow.Link
            key={news.id}
            activityName="NewsDetailPage"
            activityParams={{ newsId: news.id }}
          >
            <S.Article>
              <S.Container>
                <S.ContentWrapper>
                  <S.TextContainer>
                    <S.Title>{news.title}</S.Title>
                  </S.TextContainer>
                  <S.MetaContainer>
                    <S.MetaInfo>
                      {news.lineNumber && (
                        <>
                          {subwayIconMap.get(news.lineNumber)}
                          <S.StyledDotIcon />
                        </>
                      )}
                      <span>{news.timeElapsed}</span>
                    </S.MetaInfo>
                  </S.MetaContainer>
                </S.ContentWrapper>
                <S.ImageContainer>
                  {news?.thumbnailUrl && (
                    <S.PostImage
                      width="100%"
                      height="100%"
                      effect="opacity"
                      src={news.thumbnailUrl || '/placeholder.svg'}
                      alt={`${news.title} - ${news.timeElapsed}`}
                    />
                  )}
                </S.ImageContainer>
              </S.Container>
            </S.Article>
          </StackFlow.Link>
        ))}
      </S.NewsList>
    </S.SubwayNews>
  );
};

export default SubwayNews;
