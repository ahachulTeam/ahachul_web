import { redirect } from 'next/navigation';

import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

export default async function LoginSubwaySettingAliasPage() {
  const locale = await getServerLocale();
  redirect(localizePathname('/me', locale));
}
