'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { formatDisplayDate } from '@ahhachul/utils';

import { localizePathname, type SupportedLocale } from '@/i18n';
import { getDelayProofV2 } from '@/lib/delay-proof';
import { resolveClientErrorMessage } from '@/lib/observability';

type ProofDetailClientProps = {
  locale: SupportedLocale;
  proofId: string;
};

function formatDateTime(value: string): string {
  return formatDisplayDate(value, {
    format: 'short',
    invalidText: value,
  });
}

export default function ProofDetailClient({ locale, proofId }: ProofDetailClientProps) {
  const proofQuery = useQuery({
    queryKey: ['delay-proof-detail', proofId],
    queryFn: () => getDelayProofV2(proofId),
    staleTime: 60 * 1000,
  });

  const proof = proofQuery.data?.result;

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-title-small text-gray-100">지연 증빙 상세</h1>
          <Link
            href={localizePathname('/delay-center', locale)}
            className="inline-flex h-8 items-center rounded-lg border border-gray-40 px-3 text-label-small text-gray-90"
          >
            통합 센터로
          </Link>
        </div>
        <p className="mt-1 text-body-small text-gray-70">
          증빙 ID: <span className="font-medium text-gray-100">{proofId}</span>
        </p>

        {proofQuery.isPending ? (
          <p className="mt-3 text-body-small text-gray-70">증빙 정보를 불러오는 중입니다.</p>
        ) : null}
        {proofQuery.isError ? (
          <p className="mt-3 text-body-small text-danger">
            {resolveClientErrorMessage(
              proofQuery.error,
              '증빙 정보를 불러오지 못했습니다. 만료되었거나 유효하지 않을 수 있습니다.',
            )}
          </p>
        ) : null}

        {proof ? (
          <div className="mt-3 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-label-small text-gray-80">
              <span className="rounded-full border border-gray-30 px-2 py-0.5">
                등급 {proof.grade}
              </span>
              <span className="rounded-full border border-gray-30 px-2 py-0.5">
                신뢰도 {proof.confidenceLevel}
              </span>
              <span className="rounded-full border border-gray-30 px-2 py-0.5">
                발급 {formatDateTime(proof.issuedAt)}
              </span>
              <span className="rounded-full border border-gray-30 px-2 py-0.5">
                만료 {formatDateTime(proof.expiresAt)}
              </span>
            </div>

            <article className="rounded-xl border border-gray-30 bg-gray-10 p-3">
              <p className="text-label-medium text-gray-100">증빙 문구</p>
              <p className="mt-1 whitespace-pre-line text-body-small text-gray-90">{proof.text}</p>
            </article>

            <article className="rounded-xl border border-gray-30 bg-gray-10 p-3">
              <p className="text-label-medium text-gray-100">근거 요약</p>
              <p className="mt-1 text-body-small text-gray-80">
                공식 공지 {proof.evidenceSummary.official.eventCount}건 · 커뮤니티 시그널{' '}
                {proof.evidenceSummary.community.signalCount}건 · 실시간 신뢰도{' '}
                {proof.evidenceSummary.realtime.confidenceLevel}
              </p>
              <p className="mt-1 text-label-small text-gray-70">
                생성시각 {formatDateTime(proof.evidenceSummary.realtime.generatedAt)}
              </p>
            </article>

            <p className="text-label-small text-danger">
              안내: 본 증빙은 참고용이며 법적 효력을 보장하지 않습니다.
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
