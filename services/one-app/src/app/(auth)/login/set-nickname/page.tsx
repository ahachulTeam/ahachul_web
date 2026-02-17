'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { API_PATHS } from '@ahhachul/http';
import { NICKNAME_MAX_LENGTH, validateNickname } from '@ahhachul/utils';

import { API_BASE_URL } from '@/constant';
import { AuthService } from '@/lib/auth-service';
import { useTempAuthStore } from '@/store/auth';

async function updateNickname(payload: { nickname: string; accessToken: string }) {
  const endpoint = `${API_BASE_URL}${API_PATHS.user.profile}`;
  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.accessToken}`,
    },
    body: JSON.stringify({
      nickname: payload.nickname,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? '닉네임 설정에 실패했습니다.');
  }

  return data;
}

export default function SetNickNamePage() {
  const router = useRouter();
  const auth = useTempAuthStore(state => state.auth);
  const resetTempAuth = useTempAuthStore(state => state.reset);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (!auth) {
      router.replace('/login');
    }
  }, [auth, router]);

  const nicknameValidation = useMemo(() => validateNickname(nickname), [nickname]);
  const normalizedNickname = nicknameValidation.normalized;
  const validationMessage = nicknameValidation.message;

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      if (!auth) {
        throw new Error('세션이 만료되었습니다.');
      }

      return updateNickname({ nickname: normalizedNickname, accessToken: auth.accessToken });
    },
    onSuccess: () => {
      if (!auth) return;

      AuthService.setToken(auth.accessToken, auth.refreshToken);
      resetTempAuth();
      router.replace('/');
    },
  });

  const isDisabled = !nicknameValidation.isValid || isPending || !auth;

  return (
    <main className="relative min-h-screen bg-black px-5 pb-8 pt-9 text-white">
      <h1 className="pb-2 text-headline-large">
        <strong className="text-key-color">닉네임</strong>을 설정해주세요
      </h1>
      <p className="text-body-medium text-gray-60">
        커뮤니티와 민원에서 표시될 이름입니다. 이후 설정에서 변경할 수 있습니다.
      </p>

      <section className="mt-7">
        <label htmlFor="nickname" className="mb-2 block text-label-medium text-gray-40">
          닉네임
        </label>
        <input
          id="nickname"
          value={nickname}
          onChange={event => setNickname(event.target.value)}
          maxLength={NICKNAME_MAX_LENGTH}
          placeholder="닉네임을 입력해주세요"
          className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-title-medium outline-none placeholder:text-gray-70 focus:border-key-color"
        />
        <div className="mt-2 flex items-center justify-between">
          <p className={`text-body-small ${validationMessage ? 'text-red' : 'text-key-color'}`}>
            {validationMessage || '사용 가능한 닉네임 형식입니다.'}
          </p>
          <p className="text-body-small text-gray-70">
            {normalizedNickname.length} / {NICKNAME_MAX_LENGTH}
          </p>
        </div>
        {error instanceof Error && <p className="mt-2 text-body-small text-red">{error.message}</p>}
      </section>

      <div className="mt-8 flex gap-2">
        <button
          type="button"
          onClick={() => router.replace('/login')}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-white/20 text-label-medium"
        >
          취소
        </button>
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => mutate()}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-key-color text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
        >
          {isPending ? '처리 중...' : '완료'}
        </button>
      </div>
    </main>
  );
}
