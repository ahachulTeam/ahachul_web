import { formatDisplayDate } from '@ahhachul/utils';

import { CommunityComponent, UiComponent } from '@/components';
import { subwayIconMap } from '@/constants';
import { useUser } from '@/hooks/domain';
import { useFetchCommunityDetail } from '@/services/community';
import { useToggleCommunityBookmark, useToggleCommunityLike } from '@/services/communityReactions';
import { isLexicalContent } from '@/utils/lexical';

import * as S from './CommunityDetail.styled';

interface CommunityDetailProps {
  id: number;
}

const CommunityDetail = ({ id }: CommunityDetailProps) => {
  const { data: post } = useFetchCommunityDetail(id);

  const { user } = useUser();
  const isArticleAuthor = +post.createdBy === user?.memberId;
  const isLiked = post.likeYn === 'Y';
  const isBookmarked = post.bookmarkYn === 'Y';
  const likeMutation = useToggleCommunityLike(id, isLiked);
  const bookmarkMutation = useToggleCommunityBookmark(id, isBookmarked);

  return (
    <>
      <CommunityComponent.CommunityDetailHeaderActions id={id} createdBy={+post.createdBy} />

      <S.ArticleWrapper>
        <UiComponent.ImageCarousel label={post.title} images={post.images} />
        <S.ContentWrapper>
          <CommunityComponent.CommunityCategoryBadge categoryType={post.categoryType} />
          <S.TitleWrapper>{post.title}</S.TitleWrapper>
          <S.MetaInfoWrapper>
            <S.AuthorDateWrapper>
              <S.AuthorText>{post.writer}</S.AuthorText>
              <S.DateText>{formatDisplayDate(post.createdAt, { format: 'short' })}</S.DateText>
            </S.AuthorDateWrapper>
            <S.SubwayLineWrapper>{subwayIconMap.get(post.subwayLineId)}</S.SubwayLineWrapper>
          </S.MetaInfoWrapper>
        </S.ContentWrapper>

        <S.ContentContainer>
          {!isLexicalContent(post.content) ? (
            <S.TextContent>{post.content}</S.TextContent>
          ) : (
            <S.LexicalContent>
              <UiComponent.ReadonlyEditor content={post.content} />
            </S.LexicalContent>
          )}
        </S.ContentContainer>
        <div
          style={{
            borderTop: '1px solid #ebeef2',
            padding: '12px 20px',
            display: 'flex',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => {
              if (!user) {
                window.alert('로그인 후 이용할 수 있습니다.');
                return;
              }
              likeMutation.mutate();
            }}
            disabled={likeMutation.isPending}
            style={{
              border: '1px solid #dfe3e8',
              borderRadius: '8px',
              padding: '6px 10px',
              background: '#fff',
              fontSize: '12px',
              cursor: likeMutation.isPending ? 'not-allowed' : 'pointer',
            }}
          >
            {isLiked ? '좋아요 취소' : '좋아요'} · {post.likeCnt ?? 0}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!user) {
                window.alert('로그인 후 이용할 수 있습니다.');
                return;
              }
              bookmarkMutation.mutate();
            }}
            disabled={bookmarkMutation.isPending}
            style={{
              border: '1px solid #dfe3e8',
              borderRadius: '8px',
              padding: '6px 10px',
              background: '#fff',
              fontSize: '12px',
              cursor: bookmarkMutation.isPending ? 'not-allowed' : 'pointer',
            }}
          >
            {isBookmarked ? '북마크 취소' : '북마크'} · {post.bookmarkCnt ?? 0}
          </button>
        </div>
      </S.ArticleWrapper>

      <CommunityComponent.CommunityCommentList
        id={id}
        commentCnt={post.commentCnt}
        isArticleAuthor={isArticleAuthor}
      />
      <CommunityComponent.CommuntiyCommentInput id={id} />
      <S.Padding />
    </>
  );
};

export default CommunityDetail;
