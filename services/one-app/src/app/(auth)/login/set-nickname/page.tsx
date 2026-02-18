'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

import { API_PATHS } from '@ahhachul/http';
import { NICKNAME_MAX_LENGTH, validateNickname } from '@ahhachul/utils';

import { API_BASE_URL } from '@/constants';
import { getLocaleMessages, localizePathname, resolvePathLocale } from '@/i18n';
import { AuthService } from '@/lib/auth-service';
import { useTempAuthStore } from '@/stores/auth';

import { checkNickname } from '../_lib/checkNickname';

type NicknameCheckState = 'idle' | 'checking' | 'available' | 'duplicate' | 'error';

async function updateNickname(payload: {
  nickname: string;
  accessToken: string;
  updateFailedMessage: string;
}) {
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
    throw new Error(data?.message ?? payload.updateFailedMessage);
  }

  return data;
}

export default function SetNickNamePage() {
  const router = useRouter();
  const pathname = usePathname() ?? '/login/set-nickname';
  const locale = resolvePathLocale(pathname, null);
  const messages = getLocaleMessages(locale);
  const loginPath = localizePathname('/login', locale);
  const homePath = localizePathname('/', locale);
  const auth = useTempAuthStore(state => state.auth);
  const resetTempAuth = useTempAuthStore(state => state.reset);
  const [nickname, setNickname] = useState('');
  const [nicknameCheckState, setNicknameCheckState] = useState<NicknameCheckState>('idle');

  useEffect(() => {
    if (!auth) {
      router.replace(loginPath);
    }
  }, [auth, loginPath, router]);

  const nicknameValidation = useMemo(() => validateNickname(nickname), [nickname]);
  const normalizedNickname = nicknameValidation.normalized;
  const validationMessage = nicknameValidation.message;

  useEffect(() => {
    if (!nicknameValidation.isValid) {
      setNicknameCheckState('idle');
      return;
    }

    let isCancelled = false;
    setNicknameCheckState('checking');

    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await checkNickname(normalizedNickname);

        if (isCancelled) return;
        setNicknameCheckState(response.result.available ? 'available' : 'duplicate');
      } catch (error) {
        if (isCancelled) return;
        console.error('Nickname check failed:', error);
        setNicknameCheckState('error');
      }
    }, 500);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [nicknameValidation.isValid, normalizedNickname]);

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      if (!auth) {
        throw new Error(messages.setNickname.sessionExpired);
      }

      return updateNickname({
        nickname: normalizedNickname,
        accessToken: auth.accessToken,
        updateFailedMessage: messages.setNickname.updateFailed,
      });
    },
    onSuccess: () => {
      if (!auth) return;

      AuthService.setToken(auth.accessToken, auth.refreshToken);
      resetTempAuth();
      router.replace(homePath);
    },
  });

  const nicknameStatus = useMemo(() => {
    if (validationMessage) {
      return {
        message: validationMessage,
        tone: 'error' as const,
      };
    }

    if (nicknameCheckState === 'checking') {
      return {
        message: messages.setNickname.checkingMessage,
        tone: 'muted' as const,
      };
    }

    if (nicknameCheckState === 'duplicate') {
      return {
        message: messages.setNickname.duplicatedMessage,
        tone: 'error' as const,
      };
    }

    if (nicknameCheckState === 'error') {
      return {
        message: messages.setNickname.checkFailedMessage,
        tone: 'error' as const,
      };
    }

    return {
      message: messages.setNickname.validMessage,
      tone: 'success' as const,
    };
  }, [messages, nicknameCheckState, validationMessage]);

  const nicknameStatusClassName = (() => {
    if (nicknameStatus.tone === 'error') return 'text-red';
    if (nicknameStatus.tone === 'muted') return 'text-gray-70';
    return 'text-key-color';
  })();

  const isDisabled =
    !nicknameValidation.isValid || nicknameCheckState !== 'available' || isPending || !auth;
  const handleSubmit = () => mutate();

  return (
    <main className="relative min-h-screen bg-black px-5 pb-8 pt-9 text-white">
      <h1 className="pb-2 text-headline-large">
        <strong className="text-key-color">{messages.setNickname.titleHighlight}</strong>
        {messages.setNickname.titleSuffix}
      </h1>
      <p className="text-body-medium text-gray-60">{messages.setNickname.description}</p>

      <section className="mt-7">
        <label htmlFor="nickname" className="mb-2 block text-label-medium text-gray-40">
          {messages.setNickname.fieldLabel}
        </label>
        <input
          id="nickname"
          value={nickname}
          onChange={event => setNickname(event.target.value)}
          maxLength={NICKNAME_MAX_LENGTH}
          placeholder={messages.setNickname.placeholder}
          className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-title-medium outline-none placeholder:text-gray-70 focus:border-key-color"
        />
        <div className="mt-2 flex items-center justify-between">
          <p className={`text-body-small ${nicknameStatusClassName}`}>{nicknameStatus.message}</p>
          <p className="text-body-small text-gray-70">
            {normalizedNickname.length} / {NICKNAME_MAX_LENGTH}
          </p>
        </div>
        {error instanceof Error && <p className="mt-2 text-body-small text-red">{error.message}</p>}
      </section>

      <div className="mt-8 flex gap-2">
        <button
          type="button"
          onClick={() => router.replace(loginPath)}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-white/20 text-label-medium"
        >
          {messages.setNickname.cancel}
        </button>
        <button
          type="button"
          disabled={isDisabled}
          onClick={handleSubmit}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-key-color text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
        >
          {isPending ? messages.setNickname.submitting : messages.setNickname.submit}
        </button>
      </div>
    </main>
  );
}
