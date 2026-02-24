import { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formatDisplayDate } from '@ahhachul/utils';

import { updateUser } from '@/apis/request';
import { useToast } from '@/hooks/useToast';
import { useFetchUserProfileDetail, userKeys } from '@/services/user';
import { useFlow } from '@/stackflow';
import type { ArticleType, ProfileVisibilitySettings } from '@/types';

type ProfileMode = 'default' | 'preview' | 'settings';

type Props = {
  username: string;
  mode?: ProfileMode;
};

const VISIBILITY_FIELDS: Array<{
  key: keyof ProfileVisibilitySettings;
  label: string;
}> = [
  { key: 'profilePublic', label: '프로필 전체 공개' },
  { key: 'emailPublic', label: '이메일 공개' },
  { key: 'genderAgePublic', label: '성별/연령대 공개' },
  { key: 'postsPublic', label: '작성 글 공개' },
  { key: 'commentsPublic', label: '작성 댓글 공개' },
];

function resolveArticleLabel(articleType: ArticleType) {
  if (articleType === 'COMMUNITY') {
    return '커뮤니티';
  }

  if (articleType === 'COMPLAINT') {
    return '민원';
  }

  return '유실물';
}

const ProfileOverview = ({ username, mode = 'default' }: Props) => {
  const { addToast } = useToast();
  const { push, pop } = useFlow();
  const queryClient = useQueryClient();
  const isPreviewMode = mode === 'preview';

  const {
    data: profileResponse,
    isLoading,
    isError,
    refetch,
  } = useFetchUserProfileDetail(username, {
    asPublic: isPreviewMode,
    limit: 20,
  });

  const profile = profileResponse?.result;
  const isMine = profile?.isMine ?? false;
  const [visibilityDraft, setVisibilityDraft] = useState<ProfileVisibilitySettings | null>(null);

  useEffect(() => {
    if (!profile) {
      return;
    }

    setVisibilityDraft({
      profilePublic: profile.visibility.profilePublic,
      emailPublic: profile.visibility.emailPublic,
      genderAgePublic: profile.visibility.genderAgePublic,
      postsPublic: profile.visibility.postsPublic,
      commentsPublic: profile.visibility.commentsPublic,
    });
  }, [profile]);

  const saveVisibilityMutation = useMutation({
    mutationFn: async (nextVisibility: ProfileVisibilitySettings) => updateUser(nextVisibility),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [...userKeys.all, 'profile-detail', username],
        }),
        queryClient.invalidateQueries({
          queryKey: userKeys.info(),
        }),
      ]);
      addToast('프로필 공개 설정을 저장했습니다.', 'success');
      void refetch();
    },
    onError: error => {
      addToast(
        error instanceof Error
          ? error.message
          : '프로필 공개 설정 저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
        'error',
      );
    },
  });

  const unauthorizedMessage = useMemo(() => {
    if (mode === 'settings' && !isMine) {
      return '본인 프로필에서만 공개 설정을 변경할 수 있습니다.';
    }

    if (mode === 'preview' && !isMine) {
      return '본인 프로필에서만 미리보기를 확인할 수 있습니다.';
    }

    return null;
  }, [isMine, mode]);

  const openPost = (articleType: ArticleType, articleId: number) => {
    if (articleType === 'COMMUNITY') {
      push('CommunityDetailPage', { id: articleId });
      return;
    }

    if (articleType === 'COMPLAINT') {
      push('ComplaintDetailPage', { id: articleId });
      return;
    }

    push('LostFoundDetailPage', { id: articleId });
  };

  const saveVisibility = async () => {
    if (!visibilityDraft) {
      return;
    }

    await saveVisibilityMutation.mutateAsync(visibilityDraft);
  };

  if (isLoading) {
    return (
      <Container>
        <StateCard>프로필 정보를 불러오는 중입니다.</StateCard>
      </Container>
    );
  }

  if (isError || !profile) {
    return (
      <Container>
        <StateCard>
          <p>프로필 정보를 불러오지 못했습니다.</p>
          <button type="button" onClick={() => void refetch()}>
            다시 시도
          </button>
        </StateCard>
      </Container>
    );
  }

  if (unauthorizedMessage) {
    return (
      <Container>
        <StateCard>
          <p>{unauthorizedMessage}</p>
          <button type="button" onClick={() => pop()}>
            돌아가기
          </button>
        </StateCard>
      </Container>
    );
  }

  if (mode === 'settings') {
    return (
      <Container>
        <Card>
          <h2>프로필 공개 설정</h2>
          <p>타 사용자에게 보이는 공개 범위를 설정합니다.</p>
        </Card>

        <Card>
          <FieldList>
            {VISIBILITY_FIELDS.map(field => (
              <label key={field.key}>
                <span>{field.label}</span>
                <input
                  type="checkbox"
                  checked={visibilityDraft?.[field.key] ?? false}
                  onChange={event => {
                    setVisibilityDraft(previous => {
                      if (!previous) {
                        return previous;
                      }

                      return {
                        ...previous,
                        [field.key]: event.target.checked,
                      };
                    });
                  }}
                />
              </label>
            ))}
          </FieldList>

          <Actions>
            <button
              type="button"
              onClick={() => void saveVisibility()}
              disabled={saveVisibilityMutation.isPending || !visibilityDraft}
            >
              {saveVisibilityMutation.isPending ? '저장 중...' : '설정 저장'}
            </button>
            <button type="button" className="secondary" onClick={() => pop()}>
              취소
            </button>
          </Actions>
        </Card>
      </Container>
    );
  }

  const accountVisible = profile.visibility.profileVisible;
  const postVisible = profile.visibility.postsVisible;
  const commentVisible = profile.visibility.commentsVisible;
  const genderValue = profile.gender ?? '비공개';
  const ageRangeValue = profile.ageRange ? `${profile.ageRange}대` : '비공개';

  return (
    <Container>
      <Card>
        {mode === 'preview' ? <ModeBadge>프로필 미리보기</ModeBadge> : null}
        <h2>{profile.nickname ?? username}</h2>
        <p>{isMine ? '내 프로필 페이지입니다.' : '다른 사용자의 공개 프로필 페이지입니다.'}</p>

        {mode === 'default' && isMine ? (
          <Actions>
            <button type="button" onClick={() => push('UserProfileSettingPage', { username })}>
              프로필 설정
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => push('UserProfilePreviewPage', { username })}
            >
              미리보기
            </button>
          </Actions>
        ) : null}
      </Card>

      <Card>
        <h3>기본 정보</h3>
        {accountVisible ? (
          <InfoGrid>
            <dt>닉네임</dt>
            <dd>{profile.nickname ?? '-'}</dd>
            <dt>이메일</dt>
            <dd>{profile.email ?? profile.maskedEmail ?? '비공개'}</dd>
            <dt>성별</dt>
            <dd>{genderValue}</dd>
            <dt>연령대</dt>
            <dd>{ageRangeValue}</dd>
          </InfoGrid>
        ) : (
          <StateText>이 사용자는 프로필을 비공개로 설정했습니다.</StateText>
        )}
      </Card>

      <Card>
        <h3>작성 글</h3>
        {!postVisible ? <StateText>작성 글은 비공개 상태입니다.</StateText> : null}
        {postVisible && !profile.activities.posts.length ? (
          <StateText>공개된 작성 글이 없습니다.</StateText>
        ) : null}
        {postVisible && profile.activities.posts.length ? (
          <List>
            {profile.activities.posts.map(post => (
              <li key={`${post.articleType}-${post.articleId}`}>
                <button type="button" onClick={() => openPost(post.articleType, post.articleId)}>
                  <p>{post.title}</p>
                  <span>
                    {resolveArticleLabel(post.articleType)} ·{' '}
                    {formatDisplayDate(post.createdAt, { format: 'short' })}
                  </span>
                </button>
              </li>
            ))}
          </List>
        ) : null}
      </Card>

      <Card>
        <h3>작성 댓글</h3>
        {!commentVisible ? <StateText>작성 댓글은 비공개 상태입니다.</StateText> : null}
        {commentVisible && !profile.activities.comments.length ? (
          <StateText>공개된 작성 댓글이 없습니다.</StateText>
        ) : null}
        {commentVisible && profile.activities.comments.length ? (
          <List>
            {profile.activities.comments.map(comment => (
              <li key={comment.commentId}>
                <button
                  type="button"
                  onClick={() => openPost(comment.articleType, comment.articleId)}
                >
                  <p>{comment.contentPreview}</p>
                  <span>
                    {resolveArticleLabel(comment.articleType)} ·{' '}
                    {formatDisplayDate(comment.createdAt, { format: 'short' })}
                  </span>
                </button>
              </li>
            ))}
          </List>
        ) : null}
      </Card>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  display: grid;
  gap: 12px;
  padding: 16px 20px 24px;
`;

const Card = styled.article`
  width: 100%;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 8px;
  padding: 16px;
  background: #fff;

  h2,
  h3 {
    color: var(--ah-color-legacy-text-strong);
    font-weight: 700;
  }

  h2 {
    font-size: 18px;
  }

  h3 {
    font-size: 16px;
  }

  p {
    margin-top: 6px;
    color: var(--ah-color-legacy-text-muted);
    font-size: 13px;
  }
`;

const StateCard = styled(Card)`
  p {
    margin-top: 0;
  }

  button {
    margin-top: 8px;
    height: 32px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid var(--ah-color-legacy-border-soft);
    background: #fff;
  }
`;

const ModeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 2px 8px;
  background: var(--ah-color-legacy-surface-brand-tint);
  color: var(--ah-color-legacy-text-brand);
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Actions = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  button {
    height: 34px;
    border-radius: 8px;
    border: none;
    padding: 0 12px;
    background: var(--ah-color-legacy-surface-brand-tint-strong);
    color: #fff;
    font-weight: 600;
  }

  button.secondary {
    border: 1px solid var(--ah-color-legacy-border-soft);
    background: #fff;
    color: var(--ah-color-legacy-text-strong);
  }
`;

const FieldList = styled.div`
  margin-top: 8px;
  display: grid;
  gap: 8px;

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--ah-color-legacy-border-soft);
    border-radius: 8px;
    padding: 10px 12px;
  }

  span {
    color: var(--ah-color-legacy-text-strong);
    font-size: 14px;
  }
`;

const InfoGrid = styled.dl`
  margin-top: 8px;
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 8px 12px;

  dt {
    font-size: 13px;
    color: var(--ah-color-legacy-text-muted);
  }

  dd {
    font-size: 13px;
    color: var(--ah-color-legacy-text-strong);
  }
`;

const List = styled.ul`
  margin-top: 8px;
  display: grid;
  gap: 8px;

  button {
    width: 100%;
    text-align: left;
    border: 1px solid var(--ah-color-legacy-border-soft);
    border-radius: 8px;
    background: #fff;
    padding: 8px 10px;
  }

  p {
    margin: 0;
    color: var(--ah-color-legacy-text-strong);
    font-size: 13px;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: inline-block;
    margin-top: 4px;
    color: var(--ah-color-legacy-text-muted);
    font-size: 11px;
  }
`;

const StateText = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: var(--ah-color-legacy-text-muted);
`;

export default ProfileOverview;
