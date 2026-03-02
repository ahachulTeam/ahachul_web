import { getServerLocale } from '@/i18n/server';

import MeSettingAccountClient from './_components/MeSettingAccountClient';

export default async function MeSettingAccountPage() {
  const locale = await getServerLocale();

  return (
    <main className="min-h-screen px-4 pb-24 pt-3">
      <MeSettingAccountClient locale={locale} />
    </main>
  );
}
