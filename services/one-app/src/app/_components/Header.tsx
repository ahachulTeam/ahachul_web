'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HeaderLogoIcon, HeaderMessageIcon, HeaderNotificationIcon } from '@/assets/icon';
import {
  getLocaleMessages,
  localizePathname,
  resolvePathLocale,
  stripLocaleFromPathname,
} from '@/i18n';

const HIDDEN_HEADER_PATHS = new Set(['/login', '/login/set-nickname', '/i/flow/login', '/']);

export default function Header() {
  const pathname = usePathname() ?? '/';
  const locale = resolvePathLocale(pathname, null);
  const normalizedPathname = stripLocaleFromPathname(pathname);

  if (HIDDEN_HEADER_PATHS.has(normalizedPathname)) {
    return null;
  }

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
