import { getServerLocale } from '@/i18n/server';

import ForeignerLanguageExchangeClient from './_components/ForeignerLanguageExchangeClient';

export default async function ForeignerLanguageExchangePage() {
  const locale = await getServerLocale();
  return <ForeignerLanguageExchangeClient locale={locale} />;
}
