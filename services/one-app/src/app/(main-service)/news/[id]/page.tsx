import { notFound } from 'next/navigation';

import RouteBridgePage from '@/app/_components/RouteBridgePage';
import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewsDetailBridgePage({ params }: Props) {
  const { id } = await params;
  const normalizedId = id.trim();

  if (!normalizedId) {
    notFound();
  }

  const locale = await getServerLocale();

  return (
    <RouteBridgePage
      title={`뉴스 상세 #${normalizedId}`}
      description="뉴스 상세 화면은 콘텐츠 통합 구조로 재정비 중입니다. 현재는 커뮤니티와 민원 피드에서 주요 지하철 이슈를 확인할 수 있습니다."
      actions={[
        {
          label: '커뮤니티로 이동',
          href: localizePathname('/community', locale),
          variant: 'primary',
        },
        {
          label: '민원 게시판으로 이동',
          href: localizePathname('/complaint', locale),
          variant: 'secondary',
        },
      ]}
    />
  );
}
