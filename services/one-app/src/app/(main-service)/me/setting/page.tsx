import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

import MeSettingHub from './_components/MeSettingHub';

export default async function MeSettingPage() {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return (
    <main className="min-h-screen px-4 pb-24 pt-3">
      <MeSettingHub locale={locale} copy={messages.me} />
    </main>
  );
}
