import { getServerLocale } from '@/i18n/server';

import ForeignerHotspotsClient from './_components/ForeignerHotspotsClient';

export default async function ForeignerHotspotsPage() {
  const locale = await getServerLocale();
  return <ForeignerHotspotsClient locale={locale} />;
}
