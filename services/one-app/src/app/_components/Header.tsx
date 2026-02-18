import Link from 'next/link';

import { HeaderLogoIcon, HeaderMessageIcon, HeaderNotificationIcon } from '@/assets/icon';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

export default async function Header() {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const homePath = localizePathname('/', locale);
  const messagesPath = localizePathname('/messages', locale);
  const notificationsPath = localizePathname('/notifications', locale);

  return (
    <header className=" h-12 bg-white flex items-center justify-between px-5">
      <Link href={homePath} aria-label={messages.header.homeAria} title={messages.header.homeTitle}>
        <HeaderLogoIcon />
      </Link>
      <ul className=" flex items-center gap-4">
        <li>
          <Link
            href={messagesPath}
            aria-label={messages.header.messagesAria}
            title={messages.header.messagesTitle}
          >
            <HeaderMessageIcon />
          </Link>
        </li>
        <li>
          <Link
            href={notificationsPath}
            aria-label={messages.header.notificationsAria}
            title={messages.header.notificationsTitle}
          >
            <HeaderNotificationIcon />
          </Link>
        </li>
      </ul>
    </header>
  );
}
