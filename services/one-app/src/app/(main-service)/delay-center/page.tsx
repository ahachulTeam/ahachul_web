import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

import DelayCenterClient from './_components/DelayCenterClient';

export default async function DelayCenterPage() {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return <DelayCenterClient locale={locale} delayProofCopy={messages.me.delayProof} />;
}
