import { notFound, redirect } from 'next/navigation';

import RouteBridgePage from '@/app/_components/RouteBridgePage';
import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    step: string;
  }>;
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

export default async function LoginSettingsBridgePage({ params, searchParams }: Props) {
  const [{ step }, query] = await Promise.all([params, searchParams]);
  const locale = await getServerLocale();

  if (step === 'nickname') {
    const nicknamePath = localizePathname('/login/set-nickname', locale);

    if (query.returnTo) {
      redirect(`${nicknamePath}?returnTo=${encodeURIComponent(query.returnTo)}`);
    }

    redirect(nicknamePath);
  }

  if (step !== 'subway') {
    notFound();
  }

  return (
    <RouteBridgePage
      title="초기 지하철 설정"
      description="초기 즐겨찾기 역 설정은 마이페이지 설정 화면으로 통합되었습니다."
      note="로그인 후 즐겨찾기 역을 등록하면 실시간 도착 정보와 지연 증빙 기능을 바로 사용할 수 있습니다."
      actions={[
        {
          label: '마이 설정으로 이동',
          href: localizePathname('/me/setting', locale),
          variant: 'primary',
        },
        {
          label: '마이페이지로 이동',
          href: localizePathname('/me', locale),
          variant: 'secondary',
        },
      ]}
    />
  );
}
