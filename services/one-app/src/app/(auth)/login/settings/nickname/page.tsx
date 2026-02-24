import { redirect } from 'next/navigation';

import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

export default async function LoginNicknameSettingAliasPage() {
  const locale = await getServerLocale();
  redirect(localizePathname('/login/set-nickname', locale));
}
