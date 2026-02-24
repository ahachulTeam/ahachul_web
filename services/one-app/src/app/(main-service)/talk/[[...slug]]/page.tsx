import { notFound } from 'next/navigation';

import RouteBridgePage from '@/app/_components/RouteBridgePage';
import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

type TalkView = 'home' | 'detail' | 'settings';

function resolveTalkView(slug: string[] | undefined): TalkView | null {
  if (!slug || slug.length === 0) {
    return 'home';
  }

  if (slug.length === 1 && slug[0] === 'settings') {
    return 'settings';
  }

  if (slug.length === 1) {
    const id = Number(slug[0]);
    if (Number.isFinite(id) && id > 0) {
      return 'detail';
    }
  }

  return null;
}

function createTalkDescription(view: TalkView) {
  if (view === 'settings') {
    return '대화 알림과 읽음 상태 설정은 메시지함/알림함에서 통합 제공합니다.';
  }

  if (view === 'detail') {
    return '개별 대화 화면은 메시지함에서 관리됩니다. 폴링/수동 새로고침 기능이 메시지함에 적용되어 있습니다.';
  }

  return '기존 Talk 경로는 메시지함으로 통합되었습니다.';
}

export default async function TalkBridgePage({ params }: Props) {
  const { slug } = await params;
  const view = resolveTalkView(slug);

  if (!view) {
    notFound();
  }

  const locale = await getServerLocale();

  return (
    <RouteBridgePage
      title="톡/쪽지"
      description={createTalkDescription(view)}
      actions={[
        {
          label: '메시지함으로 이동',
          href: localizePathname('/messages', locale),
          variant: 'primary',
        },
        {
          label: '알림함으로 이동',
          href: localizePathname('/notifications', locale),
          variant: 'secondary',
        },
      ]}
    />
  );
}
