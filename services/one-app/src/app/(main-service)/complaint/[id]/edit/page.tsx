import Link from 'next/link';
import { notFound } from 'next/navigation';

import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ComplaintEditPage({ params }: Props) {
  const { id } = await params;
  const locale = await getServerLocale();
  const postId = Number(id);

  if (!Number.isFinite(postId) || postId <= 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-10 px-5 py-6">
      <section className="rounded-2xl border border-gray-30 bg-white p-5">
        <h1 className="text-title-small text-gray-100">민원 수정은 준비 중입니다</h1>
        <p className="mt-2 text-body-medium text-gray-70">
          현재 one-app에서는 민원 수정 대신 새 글 등록을 권장합니다.
        </p>
        <div className="mt-5 flex gap-2">
          <Link
            href={localizePathname(`/complaint/${postId}`, locale)}
            className="inline-flex h-10 items-center rounded-xl border border-gray-40 px-4 text-label-medium text-gray-90"
          >
            상세로 이동
          </Link>
          <Link
            href={localizePathname('/complaint/new', locale)}
            className="inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
          >
            새 민원 등록
          </Link>
        </div>
      </section>
    </main>
  );
}
