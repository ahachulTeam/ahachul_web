import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME, communityQueryKeys } from '@ahhachul/domain';
import { formatDisplayDate } from '@ahhachul/utils';

import { fetchCommunityPostTranslationV2 } from '@/apis/request/community';
import type { ForeignerLocale } from '@/apis/request/subway';
import { CommunityComponent, UiComponent } from '@/components';
import { subwayIconMap } from '@/constants';
import { useUser } from '@/hooks/domain';
import { useFetchCommunityDetail } from '@/services/community';
import { useToggleCommunityBookmark, useToggleCommunityLike } from '@/services/communityReactions';
import { isLexicalContent } from '@/utils/lexical';
import { createActionLogger } from '@/utils/observability';

import * as S from './CommunityDetail.styled';

interface CommunityDetailProps {
  id: number;
}

const FOREIGNER_LOCALE_OPTIONS: Array<{ value: ForeignerLocale; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'th', label: 'ไทย' },
  { value: 'cn', label: '中文' },
  { value: 'ko', label: '한국어' },
];

const communityDetailLogger = createActionLogger('community-detail');

const CommunityDetail = ({ id }: CommunityDetailProps) => {
  const { data: post } = useFetchCommunityDetail(id);
  const [showTranslation, setShowTranslation] = useState(false);
  const [translationLocale, setTranslationLocale] = useState<ForeignerLocale>('en');

  const { user } = useUser();
  const isArticleAuthor = +post.createdBy === user?.memberId;
  const isLiked = post.likeYn === 'Y';
  const isBookmarked = post.bookmarkYn === 'Y';
  const likeMutation = useToggleCommunityLike(id, isLiked);
  const bookmarkMutation = useToggleCommunityBookmark(id, isBookmarked);
  const translationQuery = useQuery({
    queryKey: [...communityQueryKeys.detail(id), 'translation', translationLocale] as const,
    queryFn: async () => {
      const response = await fetchCommunityPostTranslationV2(id, translationLocale);
      return response.data.result;
    },
    enabled: false,
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
  });

  const handleToggleTranslation = () => {
    if (!showTranslation && !translationQuery.data && !translationQuery.isFetching) {
      void translationQuery.refetch().then(result => {
        if (result.error) {
          communityDetailLogger.fail(
            'load-community-translation',
            result.error as Error,
            { postId: id, targetLocale: translationLocale },
            '커뮤니티 자동 번역을 불러오지 못했습니다.',
          );
        }
      });
    }

    setShowTranslation(prev => !prev);
  };

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
        <S.TranslationContainer>
          <S.TranslationHeader>
            <S.TranslationTitle>자동 번역</S.TranslationTitle>
            <S.TranslationControls>
              <select
                value={translationLocale}
                onChange={event => setTranslationLocale(event.target.value as ForeignerLocale)}
              >
                {FOREIGNER_LOCALE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button type="button" onClick={handleToggleTranslation}>
                {showTranslation ? '원문 보기' : '번역 보기'}
              </button>
            </S.TranslationControls>
          </S.TranslationHeader>
          {showTranslation ? (
            <S.TranslationBody>
              {translationQuery.isFetching ? (
                <S.TranslationStateText>번역을 불러오는 중입니다.</S.TranslationStateText>
              ) : null}
              {translationQuery.isError ? (
                <S.TranslationErrorText>
                  번역을 불러오지 못했습니다. 다시 시도해주세요.
                </S.TranslationErrorText>
              ) : null}
              {!translationQuery.isFetching &&
              !translationQuery.isError &&
              translationQuery.data ? (
                <>
                  <S.TranslationHeadline>
                    {translationQuery.data.translatedTitle}
                  </S.TranslationHeadline>
                  <S.TranslationText>{translationQuery.data.translatedContent}</S.TranslationText>
                  <S.TranslationNotice>{translationQuery.data.notice}</S.TranslationNotice>
                </>
              ) : null}
              {!translationQuery.isFetching &&
              !translationQuery.isError &&
              !translationQuery.data ? (
                <S.TranslationStateText>번역 결과가 없습니다.</S.TranslationStateText>
              ) : null}
            </S.TranslationBody>
          ) : null}
        </S.TranslationContainer>
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
