import Link from 'next/link';
import { notFound } from 'next/navigation';

import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewsDetailBridgePage({ params }: Props) {
  const { id } = await params;
  const locale = await getServerLocale();
  const numericNewsId = Number(id);

  if (!Number.isFinite(numericNewsId) || numericNewsId <= 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-5 py-6">
      <section className="rounded-2xl border border-gray-30 bg-white p-5">
        <p className="text-label-small text-gray-60">기사 ID #{numericNewsId}</p>
        <h1 className="mt-2 text-title-medium text-gray-100">
          지하철 운영/안전 소식 상세 보기 화면
        </h1>
        <p className="mt-3 text-body-medium text-gray-80">
          현재 one-app 뉴스 상세는 라우트 호환을 우선 제공하고 있습니다. 이후 단계에서 외부 기사
          연동, 공유, 원문 이동 기능을 순차적으로 고도화합니다.
        </p>

        <div className="mt-6 flex gap-2">
          <Link
            href={localizePathname('/', locale)}
            className="inline-flex h-10 items-center rounded-xl border border-gray-40 px-4 text-label-medium text-gray-90"
          >
            홈으로 이동
          </Link>
          <a
            href="https://news.seoul.go.kr/traffic/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
          >
            외부 뉴스 보기
          </a>
        </div>
      </section>
    </main>
  );
}
