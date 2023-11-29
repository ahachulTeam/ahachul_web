import Link from 'next/link'
import Item from './item/Item'
import * as S from './styled'
import { ArrowIcon } from '@/assets/icons'
import { PATH } from '@/constants'

const DUMMY_LIST = [
  {
    _id: 1,
    title: '오늘자 3호선 빌런 출현',
    content: '언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는...',
    likeCnt: '픽업 어딘가3',
    commentCnt: '서울',
    subwayLine: '신분당',
    time: '2022-07-29T00:00:00.000Z',
    category: 'Shipping',
  },
  {
    _id: 2,
    title: '지금 신분당 안오는 이유',
    content: '언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는...',
    likeCnt: '픽업 어딘가3',
    commentCnt: '서울',
    subwayLine: '수인분당',
    time: '2022-07-29T00:00:00.000Z',
    category: 'Shipping',
  },
  {
    _id: 3,
    title: '중앙역 앞 맛집 모음 리스트',
    content: '언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는...',
    likeCnt: '픽업 어딘가3',
    commentCnt: '서울',
    subwayLine: '3호선',
    time: '2022-07-29T00:00:00.000Z',
    category: 'Shipping',
  },
  {
    _id: 4,
    title: '노마스크충들 봐라',
    content: '언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는...',
    likeCnt: '픽업 어딘가3',
    commentCnt: '서울',
    subwayLine: '1호선',
    time: '2022-07-29T00:00:00.000Z',
    category: 'Shipping',
  },
  {
    _id: 5,
    title: '출근하는 길에 보기 좋은 책 모음',
    content: '언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는...',
    likeCnt: '픽업 어딘가3',
    commentCnt: '서울',
    subwayLine: '7호선',
    time: '2022-07-29T00:00:00.000Z',
    category: 'Shipping',
  },
]

function CommunityOverview() {
  return (
    <S.CommunitySection>
      <div>
        <h3 css={S.h3}>
          <b>실시간</b> HOT 게시물
        </h3>
        <Link href={PATH.COMMUNITY} aria-label="커뮤니티 페이지 링크 버튼">
          <ArrowIcon />
        </Link>
      </div>
      <S.Community>
        {DUMMY_LIST.map(data => (
          <Item key={data._id} data={data} />
        ))}
      </S.Community>
    </S.CommunitySection>
  )
}

export default CommunityOverview
