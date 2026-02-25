'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { localizePathname } from '@/i18n';
import type { SupportedLocale } from '@/i18n/config';
import { sendMessage } from '@/lib/messages';

interface NewMessageClientProps {
  locale: SupportedLocale;
  copy: {
    backToMyPage: string;
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return '쪽지 기능 처리 중 오류가 발생했습니다.';
}

export default function NewMessageClient({ locale, copy }: NewMessageClientProps) {
  const router = useRouter();
  const [targetMemberId, setTargetMemberId] = useState('');
  const [draft, setDraft] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: response => {
      const roomId = response.result.roomId;
      router.replace(localizePathname(`/messages/${roomId}`, locale));
    },
    onError: error => {
      setSubmitError(getErrorMessage(error));
    },
  });

  const handleCreateConversation = () => {
    const receiverMemberId = Number(targetMemberId);
    const content = draft.trim();

    if (!Number.isInteger(receiverMemberId) || receiverMemberId <= 0) {
      setSubmitError('상대 memberId를 숫자로 입력해주세요.');
      return;
    }

    if (!content) {
      setSubmitError('쪽지 내용을 입력해주세요.');
      return;
    }

    setSubmitError(null);
    sendMessageMutation.mutate({
      receiverMemberId,
      content,
    });
  };

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="mb-3 rounded-2xl border border-gray-30 bg-white px-4 py-3">
        <h1 className="text-title-small text-gray-100">새 대화 시작</h1>
        <p className="mt-1 text-body-medium text-gray-70">
          상대 memberId와 첫 메시지를 입력하면 새 쪽지방이 생성됩니다.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-30 bg-white p-3">
        <div className="space-y-1">
          <label className="text-label-small text-gray-80" htmlFor="receiverMemberId">
            상대 memberId
          </label>
          <input
            id="receiverMemberId"
            value={targetMemberId}
            onChange={event => setTargetMemberId(event.target.value)}
            placeholder="예: 25"
            className="h-10 w-full rounded-lg border border-gray-40 bg-white px-3 text-body-medium text-gray-90"
          />
        </div>

        <div className="mt-3 space-y-1">
          <label className="text-label-small text-gray-80" htmlFor="firstMessage">
            첫 메시지
          </label>
          <textarea
            id="firstMessage"
            value={draft}
            onChange={event => setDraft(event.target.value)}
            placeholder="쪽지를 입력해주세요."
            className="h-24 w-full resize-none rounded-lg border border-gray-40 p-3 text-body-medium text-gray-90"
          />
        </div>

        {submitError ? <p className="mt-2 text-body-small text-red">{submitError}</p> : null}

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleCreateConversation}
            disabled={sendMessageMutation.isPending}
            className="rounded-lg bg-key-color px-4 py-2 text-label-medium text-white disabled:opacity-40"
          >
            {sendMessageMutation.isPending ? '생성 중...' : '대화 시작'}
          </button>
        </div>
      </section>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={localizePathname('/messages', locale)}
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          목록으로 돌아가기
        </Link>
        <Link
          href={localizePathname('/me', locale)}
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          {copy.backToMyPage}
        </Link>
      </div>
    </main>
  );
}
