import { redirect } from 'next/navigation';

import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

export default async function SubwayHomePage() {
  const locale = await getServerLocale();
  redirect(localizePathname('/subway/map', locale));
}
