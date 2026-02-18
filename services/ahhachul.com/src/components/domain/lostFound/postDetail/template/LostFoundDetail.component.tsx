import { LazyLoadImage } from 'react-lazy-load-image-component';

import { motion } from 'motion/react';

import { formatDisplayDate, formatLost112Content, getRandomNumber } from '@ahhachul/utils';

import { CompleteCircleCheckIcon } from '@/assets/icons/system';
import { LostFoundComponent, UiComponent } from '@/components';
import { subwayIconMap } from '@/constants';
import { useUser } from '@/hooks/domain';
import { useFetchLostFoundDetail } from '@/services/lostFound';
import { isLexicalContent } from '@/utils/lexical';

import * as S from './LostFoundDetail.styled';

import Lost112InfoTable from '../lost112InfoTable/Lost112InfoTable.component';
import LostFoundBadge from '../lostFoundBadge/LostFoundBadge.component';

interface LostFoundDetailProps {
  id: number;
}

const LostFoundDetail = ({ id }: LostFoundDetailProps) => {
  const { data: post } = useFetchLostFoundDetail(id);

  const { user } = useUser();
  const isArticleAuthor = +post.createdBy === user?.memberId;

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
      <LostFoundComponent.LostFoundDetailHeaderActions
        id={id}
        status={post.status}
        createdBy={+post.createdBy}
      />

      <S.ArticleWrapper>
        {post.status === 'COMPLETE' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 1,
              opacity: { duration: 0.2 },
            }}
            css={{ zIndex: 9999, position: 'sticky', top: 0 }}
          >
            <S.CompleteWrapper>
              <CompleteCircleCheckIcon width={18} height={18} />
              <S.CompleteText>이 게시글의 분실물은 찾기 완료되었습니다</S.CompleteText>
            </S.CompleteWrapper>
          </motion.div>
        )}

        <UiComponent.ImageCarousel label={post.title} images={images} />
        <S.ContentWrapper>
          <LostFoundBadge lostFoundType={post.lostType} />
          <S.TitleWrapper>{post.title}</S.TitleWrapper>
          <S.MetaInfoWrapper>
            <S.AuthorDateWrapper>
              <S.AuthorText>{post.writer || '로스트 112'}</S.AuthorText>
              <S.DateText>{formatDisplayDate(post.createdAt, { format: 'short' })}</S.DateText>
            </S.AuthorDateWrapper>
            <S.SubwayLineWrapper>{subwayIconMap.get(post.subwayLineId)}</S.SubwayLineWrapper>
          </S.MetaInfoWrapper>
        </S.ContentWrapper>

        {post.isFromLost112 && (
          <>
            <S.Lost112Wrapper>
              <LazyLoadImage src="/lost112.png" alt="lost112-image" width={24} height={24} />
              <S.Lost112Text>로스트 112에 등록된 분실물입니다.</S.Lost112Text>
            </S.Lost112Wrapper>
            <Lost112InfoTable post={post} />
          </>
        )}

        <S.ContentContainer isFromLost112={post.isFromLost112}>
          {post.isFromLost112 || !isLexicalContent(post.content) ? (
            <S.TextContent>{formatLost112Content(post.content)}</S.TextContent>
          ) : (
            <S.LexicalContent>
              <UiComponent.ReadonlyEditor content={post.content} />
            </S.LexicalContent>
          )}
        </S.ContentContainer>
      </S.ArticleWrapper>

      <LostFoundComponent.LostFoundCommentList
        id={id}
        commentCnt={post.commentCnt}
        isArticleAuthor={isArticleAuthor}
      />
      <LostFoundComponent.RecommendPostList posts={post.recommendPosts} />
      <LostFoundComponent.CommentInput id={id} />
      <S.Padding />
    </>
  );
};

export default LostFoundDetail;
