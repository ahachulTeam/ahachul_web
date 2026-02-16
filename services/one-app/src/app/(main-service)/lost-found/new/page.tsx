import type { Metadata } from 'next';
import Link from 'next/link';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';

export const metadata: Metadata = createPageMetadata({
  title: '유실물 등록 가이드 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철',
  description: '유실물 등록을 준비하고 작성 전 체크리스트를 확인하세요.',
  siteUrl: SITE_URL,
  pathname: '/lost-found/new',
}) as Metadata;

export default function NewLostFoundPage() {
  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white p-4">
        <h1 className="text-title-small text-gray-100">유실물 등록 준비</h1>
        <p className="mt-2 text-body-medium text-gray-80">
          게시글 등록 UI는 다음 스프린트에서 통합됩니다. 지금은 목록에서 기존 게시글 흐름을 확인할
          수 있습니다.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-body-medium text-gray-80">
          <li>지하철 노선, 분실/습득 구분, 물품 특징을 미리 정리하세요.</li>
          <li>연락 가능한 방법과 시간대를 함께 준비하면 처리 속도가 빨라집니다.</li>
        </ul>
        <div className="mt-5 flex gap-2">
          <Link
            href="/lost-found"
            className="inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
          >
            유실물 목록으로 이동
          </Link>
          <Link
            href="/me"
            className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
          >
            마이 페이지
          </Link>
        </div>
      </section>
    </main>
  );
}
