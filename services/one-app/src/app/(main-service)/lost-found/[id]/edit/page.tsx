import type { Metadata } from 'next';
import Link from 'next/link';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: `유실물 글 수정(${id}) / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철`,
    description: '유실물 게시글 수정 기능을 위한 편집 경로입니다.',
    siteUrl: SITE_URL,
    pathname: `/lost-found/${id}/edit`,
  }) as Metadata;
}

export default async function LostFoundEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white p-4">
        <h1 className="text-title-small text-gray-100">유실물 게시글 편집</h1>
        <p className="mt-2 text-body-medium text-gray-80">
          게시글 ID <strong>{id}</strong>에 대한 편집 UI는 다음 스프린트에서 제공됩니다.
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/lost-found/${id}`}
            className="inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
          >
            상세 페이지로 이동
          </Link>
          <Link
            href="/lost-found"
            className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
          >
            목록으로 이동
          </Link>
        </div>
      </section>
    </main>
  );
}
