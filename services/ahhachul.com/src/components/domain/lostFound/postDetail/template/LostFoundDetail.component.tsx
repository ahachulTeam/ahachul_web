import { formatDateTime, getRandomNumber } from '@ahhachul/utils';

import { LostFoundComponent, UiComponent } from '@/components';
import { subwayIconMap } from '@/constants';
import { useFetchLostFoundDetail } from '@/services/lostFound';

import * as S from './LostFoundDetail.styled';

import Lost112InfoTable from '../lost112InfoTable/Lost112InfoTable.component';
import LostFoundBadge from '../lostFoundBadge/LostFoundBadge.component';

interface LostFoundDetailProps {
  id: number;
}

const LostFoundDetail = ({ id }: LostFoundDetailProps) => {
  const { data: post } = useFetchLostFoundDetail(id);

  const images = post.isFromLost112
    ? [
        {
          imageId: getRandomNumber(),
          imageUrl: post.externalSourceImageUrl,
        },
      ]
    : post.images;

  return (
    <>
      <S.ArticleWrapper>
        <UiComponent.ImageCarousel label={post.title} images={images} />
        <S.ContentWrapper>
          <LostFoundBadge lostFoundType={post.lostType} />
          <S.TitleWrapper>{post.title}</S.TitleWrapper>
          <S.MetaInfoWrapper>
            <S.AuthorDateWrapper>
              <S.AuthorText>{post.writer || '로스트 112'}</S.AuthorText>
              <S.DateText>{formatDateTime(post.createdAt)}</S.DateText>
            </S.AuthorDateWrapper>
            <S.SubwayLineWrapper>{subwayIconMap.get(post.subwayLineId)}</S.SubwayLineWrapper>
          </S.MetaInfoWrapper>
        </S.ContentWrapper>

        {post.isFromLost112 && (
          <>
            <S.Lost112Wrapper>
              {/* <Image src="/images/lost112.png" alt="lost112-image" width={24} height={24} priority /> */}
              <S.Lost112Text>로스트 112에 등록된 분실물입니다.</S.Lost112Text>
            </S.Lost112Wrapper>
            <Lost112InfoTable post={post} />
          </>
        )}

        <S.ContentContainer>
          {post.isFromLost112 ? (
            <S.TextContent>{post.content}</S.TextContent>
          ) : (
            <S.LexicalContent>
              <UiComponent.ReadonlyEditor content={post.content} />
            </S.LexicalContent>
          )}
        </S.ContentContainer>
      </S.ArticleWrapper>

      <LostFoundComponent.RecommendPostList posts={post.recommendPosts} />
      <LostFoundComponent.LostFoundCommentList id={id} commentCnt={post.commentCnt} />
    </>
  );
};

export default LostFoundDetail;
