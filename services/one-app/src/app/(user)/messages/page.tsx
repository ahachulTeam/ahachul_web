import type { Metadata } from 'next';
import Link from 'next/link';

import { createPageMetadata } from '@ahhachul/seo';

import { SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';

const mockMessages = [
  {
    id: 1,
    sender: '운영팀',
    title: '아하철 이용 가이드',
    body: '실시간 민원과 분실물 기능을 더 빠르게 활용하는 팁을 확인해보세요.',
    receivedAt: '방금 전',
  },
  {
    id: 2,
    sender: '알림봇',
    title: '새 댓글 도착',
    body: '내가 작성한 게시글에 새로운 댓글이 등록되었습니다.',
    receivedAt: '1시간 전',
  },
];

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle(SEO_PAGE_COPY.messages.title),
  description: SEO_PAGE_COPY.messages.description,
  siteUrl: SITE_URL,
  pathname: '/messages',
  noIndex: true,
}) as Metadata;

export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="mb-3 rounded-2xl border border-gray-30 bg-white px-4 py-3">
        <h1 className="text-title-small text-gray-100">메시지함</h1>
        <p className="mt-1 text-body-medium text-gray-70">
          운영팀 공지와 활동 메시지를 확인하세요.
        </p>
      </section>

      <section className="space-y-2">
        {mockMessages.map(message => (
          <article key={message.id} className="rounded-2xl border border-gray-30 bg-white p-4">
            <p className="text-label-small text-gray-70">{message.sender}</p>
            <h2 className="mt-1 text-title-small text-gray-100">{message.title}</h2>
            <p className="mt-1 text-body-medium text-gray-80">{message.body}</p>
            <p className="mt-2 text-body-small text-gray-60">{message.receivedAt}</p>
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
