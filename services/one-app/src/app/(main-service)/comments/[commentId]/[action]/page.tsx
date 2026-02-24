import { notFound } from 'next/navigation';

import RouteBridgePage from '@/app/_components/RouteBridgePage';
import { localizePathname, type SupportedLocale } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    commentId: string;
    action: string;
  }>;
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

type CommentAction = 'edit' | 'reply';

function resolveCommentAction(action: string): CommentAction | null {
  if (action === 'edit' || action === 'reply') {
    return action;
  }

  return null;
}

function toSafeReturnPath(rawReturnTo: string | undefined, locale: SupportedLocale) {
  const fallback = localizePathname('/community', locale);

  if (!rawReturnTo || !rawReturnTo.startsWith('/') || rawReturnTo.startsWith('//')) {
    return fallback;
  }

  try {
    const parsed = new URL(rawReturnTo, 'https://ahhachul.local');
    const localizedPath = localizePathname(parsed.pathname, locale);
    return `${localizedPath}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}

export default async function CommentBridgePage({ params, searchParams }: Props) {
  const [{ commentId, action }, query] = await Promise.all([params, searchParams]);
  const parsedCommentId = Number(commentId);
  const normalizedAction = resolveCommentAction(action);

  if (!Number.isFinite(parsedCommentId) || parsedCommentId <= 0 || !normalizedAction) {
    notFound();
  }

  const locale = await getServerLocale();
  const returnPath = toSafeReturnPath(query.returnTo, locale);
  const actionText = normalizedAction === 'edit' ? '수정' : '답글';

  return (
    <RouteBridgePage
      title={`댓글 ${actionText}`}
      description={`댓글 ${actionText} 경로는 게시글 상세 화면 내 인라인 편집/답글 UX로 통합되었습니다. 댓글 #${parsedCommentId} 작업은 원문 게시글에서 바로 진행할 수 있습니다.`}
      actions={[
        {
          label: '원문 게시글로 돌아가기',
          href: returnPath,
          variant: 'primary',
        },
        {
          label: '커뮤니티 홈으로 이동',
          href: localizePathname('/community', locale),
          variant: 'secondary',
        },
      ]}
    />
  );
}
