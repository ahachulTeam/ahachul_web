import Link from 'next/link';
import { notFound } from 'next/navigation';

import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    commentId: string;
  }>;
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

function resolveSafeReturnPath(rawPath: string | undefined, fallbackPath: string): string {
  if (rawPath && rawPath.startsWith('/')) {
    return rawPath;
  }

  return fallbackPath;
}

export default async function CommentReplyDeepLinkPage({ params, searchParams }: Props) {
  const { commentId } = await params;
  const { returnTo } = await searchParams;
  const numericCommentId = Number(commentId);
  const locale = await getServerLocale();

  if (!Number.isFinite(numericCommentId) || numericCommentId <= 0) {
    notFound();
  }

  const fallbackPath = localizePathname('/community', locale);
  const safeReturnPath = resolveSafeReturnPath(returnTo, fallbackPath);

  return (
    <main className="min-h-screen bg-gray-10 px-5 py-6">
      <section className="rounded-2xl border border-gray-30 bg-white p-5">
        <h1 className="text-title-small text-gray-100">댓글 답글 딥링크</h1>
        <p className="mt-2 text-body-medium text-gray-70">
          one-app에서는 상세 화면 하단 입력창에서 댓글 답글을 작성할 수 있습니다.
        </p>
        <p className="mt-1 text-body-small text-gray-60">대상 댓글 ID: {numericCommentId}</p>
        <Link
          href={safeReturnPath}
          className="mt-5 inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
        >
          원래 화면으로 이동
        </Link>
      </section>
    </main>
  );
}
