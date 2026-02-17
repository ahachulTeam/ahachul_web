import type { Metadata } from 'next';
import Link from 'next/link';

import { createPageMetadata } from '@ahhachul/seo';

import { SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';

const mockNotifications = [
  {
    id: 1,
    category: '민원',
    title: '등록한 민원이 처리 완료되었습니다.',
    description: '2호선 냉난방 민원 상태가 DONE으로 업데이트되었습니다.',
    time: '10분 전',
  },
  {
    id: 2,
    category: '커뮤니티',
    title: '관심 게시글에 새로운 반응이 있습니다.',
    description: '좋아요 3개, 댓글 1개가 추가되었습니다.',
    time: '2시간 전',
  },
];

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle(SEO_PAGE_COPY.notifications.title),
  description: SEO_PAGE_COPY.notifications.description,
  siteUrl: SITE_URL,
  pathname: '/notifications',
  noIndex: true,
}) as Metadata;

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="mb-3 rounded-2xl border border-gray-30 bg-white px-4 py-3">
        <h1 className="text-title-small text-gray-100">알림</h1>
        <p className="mt-1 text-body-medium text-gray-70">
          민원 상태 변경과 활동 소식을 받아보세요.
        </p>
      </section>

      <section className="space-y-2">
        {mockNotifications.map(notification => (
          <article key={notification.id} className="rounded-2xl border border-gray-30 bg-white p-4">
            <p className="text-label-small text-key-color">{notification.category}</p>
            <h2 className="mt-1 text-title-small text-gray-100">{notification.title}</h2>
            <p className="mt-1 text-body-medium text-gray-80">{notification.description}</p>
            <p className="mt-2 text-body-small text-gray-60">{notification.time}</p>
          </article>
        ))}
      </section>

      <Link
        href="/me"
        className="mt-4 inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
      >
        마이 페이지로 돌아가기
      </Link>
    </main>
  );
}
