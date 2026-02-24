'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { QUERY_STALE_TIME } from '@ahhachul/domain';

import { updateMyProfile } from '@/app/(main-service)/me/_lib/getMyProfile';
import { getLocaleMessages, localizePathname, resolvePathLocale } from '@/i18n';

import {
  getUserProfile,
  resolveProfileArticlePath,
  type ProfileVisibilitySettings,
} from '../_lib/profile';

type ProfileMode = 'default' | 'preview' | 'settings';

type Props = {
  username: string;
  mode?: ProfileMode;
};

const COPY = {
  ko: {
    previewTitle: '프로필 미리보기',
    settingsTitle: '프로필 공개 설정',
    settingsDescription: '타 사용자에게 보이는 공개 범위를 설정합니다.',
    save: '설정 저장',
    saving: '저장 중...',
    saveSuccess: '프로필 공개 설정이 저장되었습니다.',
    saveError: '프로필 공개 설정 저장에 실패했습니다.',
    profileHidden: '이 사용자는 프로필을 비공개로 설정했습니다.',
    postsHidden: '작성 글은 비공개 상태입니다.',
    commentsHidden: '작성 댓글은 비공개 상태입니다.',
    emptyPosts: '공개된 작성 글이 없습니다.',
    emptyComments: '공개된 작성 댓글이 없습니다.',
    hiddenValue: '비공개',
    unauthorizedSettings: '본인 프로필에서만 공개 설정을 변경할 수 있습니다.',
    unauthorizedPreview: '본인 프로필에서만 미리보기를 확인할 수 있습니다.',
    visibilityLabels: {
      profilePublic: '프로필 전체 공개',
      emailPublic: '이메일 공개',
      genderAgePublic: '성별/연령대 공개',
      postsPublic: '작성 글 공개',
      commentsPublic: '작성 댓글 공개',
    },
    postsTitle: '작성 글',
    commentsTitle: '작성 댓글',
    backToProfile: '프로필로 돌아가기',
    goToSettings: '프로필 설정',
    goToPreview: '미리보기',
  },
  en: {
    previewTitle: 'Profile Preview',
    settingsTitle: 'Profile Visibility Settings',
    settingsDescription: 'Configure what other users can see on your profile.',
    save: 'Save settings',
    saving: 'Saving...',
    saveSuccess: 'Profile visibility settings saved.',
    saveError: 'Failed to save profile visibility settings.',
    profileHidden: 'This user has set their profile to private.',
    postsHidden: 'Posts are private.',
    commentsHidden: 'Comments are private.',
    emptyPosts: 'No public posts.',
    emptyComments: 'No public comments.',
    hiddenValue: 'Private',
    unauthorizedSettings: 'Only the profile owner can edit visibility settings.',
    unauthorizedPreview: 'Only the profile owner can use preview mode.',
    visibilityLabels: {
      profilePublic: 'Profile public',
      emailPublic: 'Email public',
      genderAgePublic: 'Gender/Age public',
      postsPublic: 'Posts public',
      commentsPublic: 'Comments public',
    },
    postsTitle: 'Posts',
    commentsTitle: 'Comments',
    backToProfile: 'Back to profile',
    goToSettings: 'Settings',
    goToPreview: 'Preview',
  },
  th: {
    previewTitle: 'Profile Preview',
    settingsTitle: 'Profile Visibility Settings',
    settingsDescription: 'Configure what other users can see on your profile.',
    save: 'Save settings',
    saving: 'Saving...',
    saveSuccess: 'Profile visibility settings saved.',
    saveError: 'Failed to save profile visibility settings.',
    profileHidden: 'This user has set their profile to private.',
    postsHidden: 'Posts are private.',
    commentsHidden: 'Comments are private.',
    emptyPosts: 'No public posts.',
    emptyComments: 'No public comments.',
    hiddenValue: 'Private',
    unauthorizedSettings: 'Only the profile owner can edit visibility settings.',
    unauthorizedPreview: 'Only the profile owner can use preview mode.',
    visibilityLabels: {
      profilePublic: 'Profile public',
      emailPublic: 'Email public',
      genderAgePublic: 'Gender/Age public',
      postsPublic: 'Posts public',
      commentsPublic: 'Comments public',
    },
    postsTitle: 'Posts',
    commentsTitle: 'Comments',
    backToProfile: 'Back to profile',
    goToSettings: 'Settings',
    goToPreview: 'Preview',
  },
  cn: {
    previewTitle: 'Profile Preview',
    settingsTitle: 'Profile Visibility Settings',
    settingsDescription: 'Configure what other users can see on your profile.',
    save: 'Save settings',
    saving: 'Saving...',
    saveSuccess: 'Profile visibility settings saved.',
    saveError: 'Failed to save profile visibility settings.',
    profileHidden: 'This user has set their profile to private.',
    postsHidden: 'Posts are private.',
    commentsHidden: 'Comments are private.',
    emptyPosts: 'No public posts.',
    emptyComments: 'No public comments.',
    hiddenValue: 'Private',
    unauthorizedSettings: 'Only the profile owner can edit visibility settings.',
    unauthorizedPreview: 'Only the profile owner can use preview mode.',
    visibilityLabels: {
      profilePublic: 'Profile public',
      emailPublic: 'Email public',
      genderAgePublic: 'Gender/Age public',
      postsPublic: 'Posts public',
      commentsPublic: 'Comments public',
    },
    postsTitle: 'Posts',
    commentsTitle: 'Comments',
    backToProfile: 'Back to profile',
    goToSettings: 'Settings',
    goToPreview: 'Preview',
  },
} as const;

export default function ProfileOverview({ username, mode = 'default' }: Props) {
  const pathname = usePathname() ?? '/user';
  const locale = resolvePathLocale(pathname, null);
  const copy = getLocaleMessages(locale).userProfile;
  const queryClient = useQueryClient();
  const pageCopy = COPY[locale];
  const shouldUsePublicView = mode === 'preview';

  const { data, isPending, isError } = useQuery({
    queryKey: ['user-profile', username, shouldUsePublicView],
    queryFn: () => getUserProfile(username, { asPublic: shouldUsePublicView, limit: 20 }),
    staleTime: QUERY_STALE_TIME.user,
  });

  const profile = data?.result;
  const isMine = profile?.isMine ?? false;
  const profilePath = localizePathname(`/user/${encodeURIComponent(username)}`, locale);
  const settingsPath = localizePathname(`/user/${encodeURIComponent(username)}/settings`, locale);
  const previewPath = localizePathname(`/user/${encodeURIComponent(username)}/preview`, locale);

  const [visibilityDraft, setVisibilityDraft] = useState<ProfileVisibilitySettings | null>(null);

  useEffect(() => {
    if (!profile?.visibility) {
      return;
    }

    setVisibilityDraft({
      profilePublic: profile.visibility.profilePublic,
      emailPublic: profile.visibility.emailPublic,
      genderAgePublic: profile.visibility.genderAgePublic,
      postsPublic: profile.visibility.postsPublic,
      commentsPublic: profile.visibility.commentsPublic,
    });
  }, [
    profile?.visibility.profilePublic,
    profile?.visibility.emailPublic,
    profile?.visibility.genderAgePublic,
    profile?.visibility.postsPublic,
    profile?.visibility.commentsPublic,
  ]);

  const saveVisibilityMutation = useMutation({
    mutationFn: async (next: ProfileVisibilitySettings) => updateMyProfile(next),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user-profile', username] }),
        queryClient.invalidateQueries({ queryKey: ['user-profile', username, true] }),
        queryClient.invalidateQueries({ queryKey: ['me', 'profile'] }),
      ]);
      window.alert(pageCopy.saveSuccess);
    },
    onError: error => {
      window.alert(error instanceof Error ? error.message : pageCopy.saveError);
    },
  });

  const canPreview = mode === 'preview' ? isMine : true;

  const unauthorizedMessage = useMemo(() => {
    if (mode === 'settings' && !isMine) {
      return pageCopy.unauthorizedSettings;
    }

    if (mode === 'preview' && !canPreview) {
      return pageCopy.unauthorizedPreview;
    }

    return null;
  }, [canPreview, isMine, mode, pageCopy.unauthorizedPreview, pageCopy.unauthorizedSettings]);

  const handleVisibilityChange = (key: keyof ProfileVisibilitySettings, checked: boolean) => {
    setVisibilityDraft(previous => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        [key]: checked,
      };
    });
  };

  const handleVisibilitySave = async () => {
    if (!visibilityDraft) {
      return;
    }

    await saveVisibilityMutation.mutateAsync(visibilityDraft);
  };

  let profileGuideText = copy.guideDefault;
  if (isPending) {
    profileGuideText = copy.guideLoading;
  } else if (isMine) {
    profileGuideText = copy.guideMine;
  }

  if (isError) {
    return (
      <section className="space-y-3 px-5 pb-24 pt-4">
        <article className="rounded-2xl border border-gray-30 bg-white p-4">
          <h1 className="text-title-small text-gray-100">{username}</h1>
          <p className="mt-1 text-body-medium text-danger">프로필 정보를 불러오지 못했습니다.</p>
          <Link
            href={localizePathname('/me', locale)}
            className="mt-3 inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
          >
            {copy.links.myPage}
          </Link>
        </article>
      </section>
    );
  }

  if (unauthorizedMessage) {
    return (
      <section className="space-y-3 px-5 pb-24 pt-4">
        <article className="rounded-2xl border border-gray-30 bg-white p-4">
          <h1 className="text-title-small text-gray-100">{username}</h1>
          <p className="mt-1 text-body-medium text-gray-80">{unauthorizedMessage}</p>
          <Link
            href={profilePath}
            className="mt-3 inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
          >
            {pageCopy.backToProfile}
          </Link>
        </article>
      </section>
    );
  }

  if (mode === 'settings') {
    return (
      <section className="space-y-3 px-5 pb-24 pt-4">
        <article className="rounded-2xl border border-gray-30 bg-white p-4">
          <p className="text-label-small text-gray-70">{pageCopy.settingsTitle}</p>
          <h1 className="mt-1 text-headline-small text-gray-100">{username}</h1>
          <p className="mt-1 text-body-medium text-gray-80">{pageCopy.settingsDescription}</p>
        </article>

        <article className="rounded-2xl border border-gray-30 bg-white p-4">
          <h2 className="text-title-small text-gray-100">공개 범위</h2>
          <div className="mt-3 space-y-3">
            {visibilityDraft ? (
              <>
                {(
                  Object.keys(pageCopy.visibilityLabels) as Array<keyof ProfileVisibilitySettings>
                ).map(key => (
                  <label
                    key={key}
                    className="flex items-center justify-between gap-3 rounded-xl border border-gray-20 px-3 py-2"
                  >
                    <span className="text-body-medium text-gray-90">
                      {pageCopy.visibilityLabels[key]}
                    </span>
                    <input
                      type="checkbox"
                      checked={visibilityDraft[key]}
                      onChange={event => handleVisibilityChange(key, event.target.checked)}
                      className="h-4 w-4"
                    />
                  </label>
                ))}
              </>
            ) : (
              <p className="text-body-small text-gray-70">설정 정보를 불러오는 중입니다.</p>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => void handleVisibilitySave()}
              disabled={saveVisibilityMutation.isPending || !visibilityDraft}
              className="inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
            >
              {saveVisibilityMutation.isPending ? pageCopy.saving : pageCopy.save}
            </button>
            <Link
              href={profilePath}
              className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
            >
              {pageCopy.backToProfile}
            </Link>
          </div>
        </article>
      </section>
    );
  }

  const profileVisible = profile?.visibility.profileVisible ?? false;
  const emailValue = profile?.email ?? profile?.maskedEmail ?? pageCopy.hiddenValue;
  const genderValue = profile?.gender ?? pageCopy.hiddenValue;
  const ageRangeValue = profile?.ageRange
    ? `${profile.ageRange}${copy.ageRangeSuffix}`
    : pageCopy.hiddenValue;

  let postsContent = <p className="mt-2 text-body-medium text-gray-70">{pageCopy.emptyPosts}</p>;
  if (!profile?.visibility.postsVisible) {
    postsContent = <p className="mt-2 text-body-medium text-gray-70">{pageCopy.postsHidden}</p>;
  } else if (profile.activities.posts.length) {
    postsContent = (
      <ul className="mt-2 space-y-2">
        {profile.activities.posts.map(post => (
          <li key={`${post.articleType}-${post.articleId}`}>
            <Link
              href={localizePathname(
                resolveProfileArticlePath(post.articleType, post.articleId),
                locale,
              )}
              className="block rounded-xl border border-gray-20 px-3 py-2"
            >
              <p className="text-label-medium text-gray-100">{post.title}</p>
              <p className="mt-1 line-clamp-2 text-body-small text-gray-80">
                {post.contentPreview}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  let commentsContent = (
    <p className="mt-2 text-body-medium text-gray-70">{pageCopy.emptyComments}</p>
  );
  if (!profile?.visibility.commentsVisible) {
    commentsContent = (
      <p className="mt-2 text-body-medium text-gray-70">{pageCopy.commentsHidden}</p>
    );
  } else if (profile.activities.comments.length) {
    commentsContent = (
      <ul className="mt-2 space-y-2">
        {profile.activities.comments.map(comment => (
          <li key={comment.commentId}>
            <Link
              href={localizePathname(
                resolveProfileArticlePath(comment.articleType, comment.articleId),
                locale,
              )}
              className="block rounded-xl border border-gray-20 px-3 py-2"
            >
              <p className="line-clamp-2 text-body-small text-gray-90">{comment.contentPreview}</p>
              <p className="mt-1 text-label-small text-gray-70">{comment.createdAt}</p>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="space-y-3 px-5 pb-24 pt-4">
      <article className="rounded-2xl border border-gray-30 bg-white p-4">
        {mode === 'preview' ? (
          <p className="text-label-small text-gray-70">{pageCopy.previewTitle}</p>
        ) : null}
        <p className="text-label-small text-gray-70">{copy.sectionTitle}</p>
        <h1 className="mt-1 text-headline-small text-gray-100">{username}</h1>
        <p className="mt-1 text-body-medium text-gray-80">{profileGuideText}</p>

        {mode === 'default' && isMine ? (
          <div className="mt-3 flex gap-2">
            <Link
              href={settingsPath}
              className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
            >
              {pageCopy.goToSettings}
            </Link>
            <Link
              href={previewPath}
              className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
            >
              {pageCopy.goToPreview}
            </Link>
          </div>
        ) : null}
      </article>

      <article className="rounded-2xl border border-gray-30 bg-white p-4">
        <h2 className="text-title-small text-gray-100">{copy.accountInfoTitle}</h2>
        {profileVisible ? (
          <dl className="mt-2 grid grid-cols-[96px_1fr] gap-y-2 text-body-medium text-gray-80">
            <dt>{copy.fields.nickname}</dt>
            <dd>{profile?.nickname ?? '-'}</dd>
            <dt>{copy.fields.email}</dt>
            <dd>{emailValue}</dd>
            <dt>{copy.fields.gender}</dt>
            <dd>{genderValue}</dd>
            <dt>{copy.fields.ageRange}</dt>
            <dd>{ageRangeValue}</dd>
          </dl>
        ) : (
          <p className="mt-2 text-body-medium text-gray-70">{pageCopy.profileHidden}</p>
        )}
      </article>

      <article className="rounded-2xl border border-gray-30 bg-white p-4">
        <h2 className="text-title-small text-gray-100">{pageCopy.postsTitle}</h2>
        {postsContent}
      </article>

      <article className="rounded-2xl border border-gray-30 bg-white p-4">
        <h2 className="text-title-small text-gray-100">{pageCopy.commentsTitle}</h2>
        {commentsContent}
      </article>

      <div className="flex gap-2">
        <Link
          href={localizePathname('/me', locale)}
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          {copy.links.myPage}
        </Link>
        <Link
          href={localizePathname('/messages', locale)}
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          {copy.links.messages}
        </Link>
      </div>
    </section>
  );
}
