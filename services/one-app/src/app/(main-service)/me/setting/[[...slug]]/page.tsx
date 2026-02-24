import { notFound } from 'next/navigation';

import RouteBridgePage from '@/app/_components/RouteBridgePage';
import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

type MySettingView = 'root' | 'account';

function resolveMySettingView(slug: string[] | undefined): MySettingView | null {
  if (!slug || slug.length === 0) {
    return 'root';
  }

  if (slug.length === 1 && slug[0] === 'account') {
    return 'account';
  }

  return null;
}

export default async function MySettingBridgePage({ params }: Props) {
  const { slug } = await params;
  const view = resolveMySettingView(slug);

  if (!view) {
    notFound();
  }

  const locale = await getServerLocale();

  if (view === 'account') {
    return (
      <RouteBridgePage
        title="계정 설정"
        description="마이페이지 대시보드에서 닉네임, 이메일 노출, 즐겨찾기 역을 함께 관리할 수 있습니다."
        note="세부 계정 항목은 대시보드 중심 편집으로 통합되었습니다."
        actions={[
          {
            label: '마이페이지로 이동',
            href: localizePathname('/me', locale),
            variant: 'primary',
          },
          {
            label: '알림함 보기',
            href: localizePathname('/notifications', locale),
            variant: 'secondary',
          },
        ]}
      />
    );
  }

  return (
    <RouteBridgePage
      title="마이 설정"
      description="언어, 즐겨찾기 역, 닉네임 및 지연 증빙 기능은 마이페이지에서 한 번에 설정할 수 있습니다."
      actions={[
        {
          label: '마이페이지로 이동',
          href: localizePathname('/me', locale),
          variant: 'primary',
        },
        {
          label: '메시지함 보기',
          href: localizePathname('/messages', locale),
          variant: 'secondary',
        },
      ]}
    />
  );
}
