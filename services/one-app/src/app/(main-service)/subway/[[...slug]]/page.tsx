import { notFound } from 'next/navigation';

import RouteBridgePage from '@/app/_components/RouteBridgePage';
import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

type SubwayView = 'home' | 'map' | 'timeline';

function resolveSubwayView(slug: string[] | undefined): SubwayView | null {
  if (!slug || slug.length === 0) {
    return 'home';
  }

  if (slug.length === 1 && (slug[0] === 'map' || slug[0] === 'timeline')) {
    return slug[0];
  }

  return null;
}

function createSubwayDescription(view: SubwayView) {
  if (view === 'map') {
    return '노선도 중심 화면은 개편 중입니다. 현재는 마이페이지에서 실시간 도착/첫차·막차 정보를 확인할 수 있습니다.';
  }

  if (view === 'timeline') {
    return '타임라인 중심 뷰는 개편 중입니다. 실시간 지하철 도착 정보는 마이페이지에서 즉시 확인 가능합니다.';
  }

  return '지하철 정보 기능은 마이페이지의 실시간/첫차·막차 섹션으로 통합 제공됩니다.';
}

export default async function SubwayBridgePage({ params }: Props) {
  const { slug } = await params;
  const view = resolveSubwayView(slug);

  if (!view) {
    notFound();
  }

  const locale = await getServerLocale();

  return (
    <RouteBridgePage
      title="지하철 정보"
      description={createSubwayDescription(view)}
      actions={[
        {
          label: '마이페이지(실시간 도착)로 이동',
          href: localizePathname('/me', locale),
          variant: 'primary',
        },
        {
          label: '커뮤니티 보기',
          href: localizePathname('/community', locale),
          variant: 'secondary',
        },
      ]}
    />
  );
}
