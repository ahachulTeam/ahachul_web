'use client';

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { QUERY_STALE_TIME, myQueryKeys } from '@ahhachul/domain';
import { maskEmail, normalizeInputText, validateNickname } from '@ahhachul/utils';

import { localizePathname, type SupportedLocale } from '@/i18n';
import { resolveClientErrorMessage } from '@/lib/observability';
import { uploadProfileImageFile } from '@/lib/profile-image-upload';

import {
  checkNicknameAvailability,
  getMyProfile,
  updateMyProfile,
} from '../../../_lib/getMyProfile';

const cardClassName = 'rounded-2xl border border-gray-30 bg-white p-4';
const MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

type FeedbackType = 'success' | 'error' | 'info';

type Feedback = {
  type: FeedbackType;
  message: string;
};

type MeSettingAccountClientProps = {
  locale: SupportedLocale;
};

type VisibilityDraft = {
  profilePublic: boolean;
  emailPublic: boolean;
  genderAgePublic: boolean;
  postsPublic: boolean;
  commentsPublic: boolean;
};

function getFeedbackClassName(type: FeedbackType) {
  if (type === 'error') {
    return 'text-danger';
  }
  if (type === 'success') {
    return 'text-key-color';
  }
  return 'text-gray-80';
}

const VISIBILITY_LABELS: Array<{ key: keyof VisibilityDraft; label: string }> = [
  { key: 'profilePublic', label: '프로필 전체 공개' },
  { key: 'emailPublic', label: '이메일 공개' },
  { key: 'genderAgePublic', label: '성별/연령대 공개' },
  { key: 'postsPublic', label: '작성 글 공개' },
  { key: 'commentsPublic', label: '작성 댓글 공개' },
];

export default function MeSettingAccountClient({ locale }: MeSettingAccountClientProps) {
  const queryClient = useQueryClient();
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [nicknameDraft, setNicknameDraft] = useState('');
  const [visibilityDraft, setVisibilityDraft] = useState<VisibilityDraft | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: myQueryKeys.profile(),
    queryFn: getMyProfile,
    staleTime: QUERY_STALE_TIME.user,
  });

  const profile = data?.result;
  const encodedNickname = profile?.nickname ? encodeURIComponent(profile.nickname) : null;

  useEffect(() => {
    if (!profile) {
      return;
    }
    setNicknameDraft(profile.nickname ?? '');
    setVisibilityDraft({
      profilePublic: profile.profilePublic ?? true,
      emailPublic: profile.emailPublic ?? false,
      genderAgePublic: profile.genderAgePublic ?? false,
      postsPublic: profile.postsPublic ?? true,
      commentsPublic: profile.commentsPublic ?? true,
    });
  }, [
    profile?.nickname,
    profile?.profilePublic,
    profile?.emailPublic,
    profile?.genderAgePublic,
    profile?.postsPublic,
    profile?.commentsPublic,
  ]);

  const refreshProfile = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: myQueryKeys.profile() }),
      queryClient.invalidateQueries({ queryKey: ['user-profile'] }),
    ]);
  };

  const saveNicknameMutation = useMutation({
    mutationFn: async () => {
      if (!profile) {
        throw new Error('사용자 정보를 찾지 못했습니다.');
      }
      const validation = validateNickname(nicknameDraft);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      const nextNickname = validation.normalized;
      if (normalizeInputText(profile.nickname) === nextNickname) {
        throw new Error('기존 닉네임과 동일합니다.');
      }

      const checkResponse = await checkNicknameAvailability(nextNickname);
      if (!checkResponse.result.available) {
        throw new Error('중복인 닉네임이라 사용할 수 없습니다.');
      }

      await updateMyProfile({ nickname: nextNickname });
      return nextNickname;
    },
    onSuccess: async nickname => {
      await refreshProfile();
      setFeedback({
        type: 'success',
        message: `닉네임이 '${nickname}'으로 변경되었습니다.`,
      });
    },
    onError: error => {
      const userMessage = resolveClientErrorMessage(error, '닉네임 변경에 실패했습니다.');
      setFeedback({ type: 'error', message: userMessage });
    },
  });

  const saveVisibilityMutation = useMutation({
    mutationFn: async () => {
      if (!visibilityDraft) {
        throw new Error('공개 설정을 불러오는 중입니다.');
      }
      await updateMyProfile(visibilityDraft);
    },
    onSuccess: async () => {
      await refreshProfile();
      setFeedback({ type: 'success', message: '공개 설정이 저장되었습니다.' });
    },
    onError: error => {
      const userMessage = resolveClientErrorMessage(error, '공개 설정 저장에 실패했습니다.');
      setFeedback({ type: 'error', message: userMessage });
    },
  });

  const uploadProfileImageMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!file.type.startsWith('image/')) {
        throw new Error('이미지 파일만 업로드할 수 있습니다.');
      }
      if (file.size > MAX_PROFILE_IMAGE_SIZE_BYTES) {
        throw new Error('이미지는 5MB 이하 파일만 업로드할 수 있습니다.');
      }

      const uploadedImageUrl = await uploadProfileImageFile(file);
      await updateMyProfile({ imageUrl: uploadedImageUrl });
      return uploadedImageUrl;
    },
    onSuccess: async () => {
      await refreshProfile();
      setFeedback({ type: 'success', message: '프로필 이미지가 변경되었습니다.' });
    },
    onError: error => {
      const userMessage = resolveClientErrorMessage(error, '프로필 이미지 업로드에 실패했습니다.');
      setFeedback({ type: 'error', message: userMessage });
    },
  });

  const isVisibilityDirty = useMemo(() => {
    if (!profile || !visibilityDraft) {
      return false;
    }

    return (
      (profile.profilePublic ?? true) !== visibilityDraft.profilePublic ||
      (profile.emailPublic ?? false) !== visibilityDraft.emailPublic ||
      (profile.genderAgePublic ?? false) !== visibilityDraft.genderAgePublic ||
      (profile.postsPublic ?? true) !== visibilityDraft.postsPublic ||
      (profile.commentsPublic ?? true) !== visibilityDraft.commentsPublic
    );
  }, [
    profile,
    visibilityDraft?.profilePublic,
    visibilityDraft?.emailPublic,
    visibilityDraft?.genderAgePublic,
    visibilityDraft?.postsPublic,
    visibilityDraft?.commentsPublic,
  ]);

  const handleProfileImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) {
      return;
    }
    setFeedback(null);
    void uploadProfileImageMutation.mutateAsync(file);
  };

  if (isPending) {
    return (
      <section className="space-y-3 px-5 pb-24 pt-4">
        <div className={`${cardClassName} h-[140px] animate-pulse bg-gray-20`} />
        <div className={`${cardClassName} h-[220px] animate-pulse bg-gray-20`} />
      </section>
    );
  }

  if (isError || !profile) {
    return (
      <section className="space-y-3 px-5 pb-24 pt-4">
        <article className={cardClassName}>
          <h1 className="text-title-small text-gray-100">계정 기본정보 관리</h1>
          <p className="mt-2 text-body-medium text-gray-80">
            세션이 만료되었거나 사용자 정보를 불러오지 못했습니다.
          </p>
          <Link
            href={localizePathname('/login', locale)}
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
          >
            로그인 화면으로 이동
          </Link>
        </article>
      </section>
    );
  }

  return (
    <section className="space-y-3 px-5 pb-24 pt-4">
      <article className={`${cardClassName} bg-gradient-to-r from-green-50 to-white`}>
        <p className="text-label-small text-gray-70">계정 기본정보 관리</p>
        <h1 className="mt-1 text-headline-small text-gray-100">{profile.nickname}</h1>
        <p className="mt-1 text-body-medium text-gray-80">
          {maskEmail(profile.maskedEmail ?? profile.email)}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Link
            href={localizePathname('/me/setting', locale)}
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            설정 허브
          </Link>
          <Link
            href={localizePathname('/me', locale)}
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            마이페이지
          </Link>
          {encodedNickname ? (
            <Link
              href={localizePathname(`/user/${encodedNickname}/preview`, locale)}
              className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
            >
              프로필 미리보기
            </Link>
          ) : null}
        </div>
      </article>

      {feedback ? (
        <article className={cardClassName}>
          <p className={`text-body-medium ${getFeedbackClassName(feedback.type)}`}>
            {feedback.message}
          </p>
        </article>
      ) : null}

      <article className={cardClassName}>
        <h2 className="text-title-small text-gray-100">프로필 이미지</h2>
        <p className="mt-1 text-body-small text-gray-70">
          선택 사항입니다. 이미지 없이도 이용할 수 있습니다.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-30 bg-white">
            {profile.imageUrl ? (
              <img
                src={profile.imageUrl}
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-title-small text-gray-70">
                {(profile.nickname?.[0] ?? '아').toUpperCase()}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => profileImageInputRef.current?.click()}
            disabled={uploadProfileImageMutation.isPending}
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {uploadProfileImageMutation.isPending ? '업로드 중...' : '이미지 선택'}
          </button>
          <input
            ref={profileImageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageFileChange}
          />
        </div>
      </article>

      <article className={cardClassName}>
        <h2 className="text-title-small text-gray-100">닉네임</h2>
        <p className="mt-1 text-body-small text-gray-70">커뮤니티/댓글/활동 화면에 표시됩니다.</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={nicknameDraft}
            onChange={event => setNicknameDraft(event.target.value)}
            className="h-10 flex-1 rounded-xl border border-gray-30 px-3 text-body-medium text-gray-90"
            placeholder="닉네임을 입력하세요."
            maxLength={12}
          />
          <button
            type="button"
            onClick={() => {
              setFeedback(null);
              void saveNicknameMutation.mutateAsync();
            }}
            disabled={saveNicknameMutation.isPending}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-key-color px-4 text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
          >
            {saveNicknameMutation.isPending ? '변경 중...' : '닉네임 저장'}
          </button>
        </div>
      </article>

      <article className={cardClassName}>
        <h2 className="text-title-small text-gray-100">공개 범위</h2>
        <p className="mt-1 text-body-small text-gray-70">
          내 프로필과 활동이 다른 사용자에게 보이는 범위를 조정합니다.
        </p>
        <div className="mt-3 space-y-2">
          {visibilityDraft
            ? VISIBILITY_LABELS.map(item => (
                <label
                  key={item.key}
                  className="flex items-center justify-between rounded-xl border border-gray-20 px-3 py-2"
                >
                  <span className="text-body-medium text-gray-90">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={visibilityDraft[item.key]}
                    onChange={event =>
                      setVisibilityDraft(previous =>
                        previous
                          ? {
                              ...previous,
                              [item.key]: event.target.checked,
                            }
                          : previous,
                      )
                    }
                    className="h-4 w-4"
                  />
                </label>
              ))
            : null}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setFeedback(null);
              void saveVisibilityMutation.mutateAsync();
            }}
            disabled={saveVisibilityMutation.isPending || !visibilityDraft || !isVisibilityDirty}
            className="inline-flex h-9 items-center rounded-lg bg-key-color px-3 text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
          >
            {saveVisibilityMutation.isPending ? '저장 중...' : '공개 설정 저장'}
          </button>
          {encodedNickname ? (
            <Link
              href={localizePathname(`/user/${encodedNickname}/settings`, locale)}
              className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
            >
              상세 설정 페이지로 이동
            </Link>
          ) : null}
        </div>
      </article>
    </section>
  );
}
