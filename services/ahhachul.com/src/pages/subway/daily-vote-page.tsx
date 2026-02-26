import { useMemo, useState, type CSSProperties } from 'react';

import { type ActivityComponentType } from '@stackflow/react';
import { useQueryClient } from '@tanstack/react-query';

import { formatDisplayDate } from '@ahhachul/utils';

import { LayoutComponent } from '@/components';
import {
  useCreateDailyVoteComment,
  useFetchDailyVoteComments,
  useToggleDailyVoteCommentLike,
} from '@/services/subway';
import { useFlow } from '@/stackflow';
import { resolveClientErrorMessage } from '@/utils/observability';

type DailyVotePageParams = {
  pollId: number;
  question?: string;
  stationName?: string;
};

const sectionStyle: CSSProperties = {
  border: '1px solid #E4E6EB',
  borderRadius: '12px',
  padding: '14px',
  background: '#FFFFFF',
};

const DailyVotePage: ActivityComponentType<DailyVotePageParams> = ({
  params,
}: {
  params: DailyVotePageParams;
}) => {
  const { push } = useFlow();
  const queryClient = useQueryClient();
  const pollId = Number(params.pollId ?? 0);
  const [sort, setSort] = useState<'latest' | 'popular'>('latest');
  const [draftContent, setDraftContent] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const commentsQuery = useFetchDailyVoteComments(pollId, sort, { enabled: pollId > 0 });
  const createCommentMutation = useCreateDailyVoteComment(pollId);
  const toggleLikeMutation = useToggleDailyVoteCommentLike();

  const comments = commentsQuery.data?.comments ?? [];
  const pageTitle = params.question || '오늘 이동은 어떠셨나요?';
  const stationName = params.stationName || '-';

  const canSubmit = useMemo(
    () => draftContent.trim().length > 0 || imageUrls.length > 0,
    [draftContent, imageUrls],
  );

  const handleAddImageUrl = () => {
    const normalized = imageUrlInput.trim();
    if (!normalized) {
      return;
    }
    if (!/^https?:\/\/\S+$/i.test(normalized)) {
      setErrorMessage('이미지 URL은 http(s)로 시작해야 합니다.');
      return;
    }
    if (imageUrls.includes(normalized)) {
      setImageUrlInput('');
      return;
    }
    setImageUrls(prev => [...prev, normalized].slice(0, 8));
    setImageUrlInput('');
    setErrorMessage(null);
  };

  const handleSubmitComment = () => {
    const normalizedContent = draftContent.trim();
    if (!normalizedContent && imageUrls.length === 0) {
      setErrorMessage('내용 또는 이미지 URL을 입력해주세요.');
      return;
    }

    createCommentMutation.mutate(
      {
        content: normalizedContent,
        imageUrls,
      },
      {
        onSuccess: async () => {
          setDraftContent('');
          setImageUrls([]);
          setErrorMessage(null);
          await queryClient.invalidateQueries({ queryKey: ['daily-vote', 'comments', pollId] });
        },
        onError: error => {
          setErrorMessage(resolveClientErrorMessage(error, '댓글 등록에 실패했습니다.'));
        },
      },
    );
  };

  return (
    <LayoutComponent.Base>
      <div
        style={{
          minHeight: '100%',
          background: '#F8F9FB',
          padding: '16px',
          display: 'grid',
          gap: '12px',
        }}
      >
        <section style={sectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 700 }}>오늘의 이동 공감</h1>
            <button
              type="button"
              onClick={() =>
                push('DailyVoteHubPage', {
                  stationName,
                })
              }
              style={{
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                background: '#fff',
                padding: '0 10px',
                cursor: 'pointer',
              }}
            >
              라운지
            </button>
          </div>
          <p style={{ marginTop: '6px', fontSize: '12px', color: '#4B5563' }}>
            {stationName} · poll #{pollId}
          </p>
          <p style={{ marginTop: '6px', fontSize: '14px', color: '#111827' }}>{pageTitle}</p>
        </section>

        <section style={sectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>댓글 {comments.length}개</strong>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setSort('latest')}
                style={{
                  borderRadius: '6px',
                  border: sort === 'latest' ? '1px solid #2ACF6C' : '1px solid #D1D5DB',
                  background: sort === 'latest' ? '#2ACF6C' : '#fff',
                  color: sort === 'latest' ? '#fff' : '#111827',
                  padding: '4px 8px',
                  fontSize: '12px',
                }}
              >
                최신순
              </button>
              <button
                type="button"
                onClick={() => setSort('popular')}
                style={{
                  borderRadius: '6px',
                  border: sort === 'popular' ? '1px solid #2ACF6C' : '1px solid #D1D5DB',
                  background: sort === 'popular' ? '#2ACF6C' : '#fff',
                  color: sort === 'popular' ? '#fff' : '#111827',
                  padding: '4px 8px',
                  fontSize: '12px',
                }}
              >
                인기순
              </button>
            </div>
          </div>

          {commentsQuery.isLoading ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#6B7280' }}>
              댓글을 불러오는 중입니다.
            </p>
          ) : null}
          {commentsQuery.isError ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#B91C1C' }}>
              {resolveClientErrorMessage(commentsQuery.error, '댓글을 불러오지 못했습니다.')}
            </p>
          ) : null}

          <ul style={{ marginTop: '10px', display: 'grid', gap: '8px' }}>
            {comments.map(comment => (
              <li
                key={comment.commentId}
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  background: '#F9FAFB',
                  padding: '10px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                  }}
                >
                  <strong style={{ fontSize: '13px' }}>{comment.writer}</strong>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>
                    {formatDisplayDate(comment.createdAt, { format: 'short' })}
                  </span>
                </div>
                <p
                  style={{
                    marginTop: '6px',
                    whiteSpace: 'pre-wrap',
                    fontSize: '13px',
                    color: '#111827',
                  }}
                >
                  {comment.content}
                </p>
                {comment.imageUrls.length > 0 ? (
                  <div
                    style={{
                      marginTop: '8px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                      gap: '6px',
                    }}
                  >
                    {comment.imageUrls.map(imageUrl => (
                      <a
                        key={`${comment.commentId}-${imageUrl}`}
                        href={imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          overflow: 'hidden',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                        }}
                      >
                        <img
                          src={imageUrl}
                          alt="댓글 이미지"
                          style={{ width: '100%', height: '82px', objectFit: 'cover' }}
                        />
                      </a>
                    ))}
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() =>
                    toggleLikeMutation.mutate(
                      {
                        commentId: comment.commentId,
                        likedByMe: comment.likedByMe,
                      },
                      {
                        onSuccess: async () => {
                          await queryClient.invalidateQueries({
                            queryKey: ['daily-vote', 'comments', pollId],
                          });
                        },
                      },
                    )
                  }
                  style={{
                    marginTop: '8px',
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                    fontSize: '12px',
                    color: '#4B5563',
                    cursor: 'pointer',
                  }}
                >
                  {comment.likedByMe ? '좋아요 취소' : '좋아요'} · {comment.likeCount}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ ...sectionStyle, position: 'sticky', bottom: 0 }}>
          <div style={{ display: 'grid', gap: '8px' }}>
            <textarea
              value={draftContent}
              onChange={event => setDraftContent(event.target.value)}
              rows={3}
              placeholder="오늘 이동 경험을 자유롭게 남겨주세요."
              style={{
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '13px',
                resize: 'none',
              }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="url"
                value={imageUrlInput}
                onChange={event => setImageUrlInput(event.target.value)}
                placeholder="https:// 이미지/GIF URL"
                style={{
                  flex: 1,
                  height: '34px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  padding: '0 10px',
                  fontSize: '12px',
                }}
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                style={{
                  height: '34px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  background: '#fff',
                  padding: '0 10px',
                  fontSize: '12px',
                }}
              >
                이미지 추가
              </button>
            </div>
            {imageUrls.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
                  gap: '6px',
                }}
              >
                {imageUrls.map(imageUrl => (
                  <div
                    key={imageUrl}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt="첨부 이미지"
                      style={{ width: '100%', height: '60px', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => setImageUrls(prev => prev.filter(url => url !== imageUrl))}
                      style={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        border: 'none',
                        borderRadius: '4px',
                        background: 'rgba(0,0,0,0.55)',
                        color: '#fff',
                        fontSize: '10px',
                        padding: '0 4px',
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
            {errorMessage ? (
              <p style={{ fontSize: '12px', color: '#B91C1C' }}>{errorMessage}</p>
            ) : null}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  setDraftContent('');
                  setImageUrls([]);
                  setImageUrlInput('');
                  setErrorMessage(null);
                }}
                style={{
                  height: '32px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  background: '#fff',
                  padding: '0 10px',
                  fontSize: '12px',
                }}
              >
                초기화
              </button>
              <button
                type="button"
                disabled={!canSubmit || createCommentMutation.isPending}
                onClick={handleSubmitComment}
                style={{
                  height: '32px',
                  borderRadius: '8px',
                  border: '1px solid #2ACF6C',
                  background: '#2ACF6C',
                  color: '#fff',
                  padding: '0 10px',
                  fontSize: '12px',
                  opacity: !canSubmit || createCommentMutation.isPending ? 0.6 : 1,
                }}
              >
                {createCommentMutation.isPending ? '등록 중...' : '등록'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </LayoutComponent.Base>
  );
};

export default DailyVotePage;
