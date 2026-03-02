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

const HIDDEN_PREFIXES = ['/login', '/i/flow/login'];

export default function Header() {
  const pathname = usePathname() ?? '/';
  const locale = resolvePathLocale(pathname, null);
  const normalizedPathname = stripLocaleFromPathname(pathname);

  if (HIDDEN_PREFIXES.some(prefix => normalizedPathname.startsWith(prefix))) {
    return null;
  }

  const messages = getLocaleMessages(locale);
  const homePath = localizePathname('/', locale);
  const messagesPath = localizePathname('/messages', locale);
  const notificationsPath = localizePathname('/notifications', locale);
  const myPath = localizePathname('/me', locale);

  return (
    <header className="sticky top-0 z-40 px-4 pt-3">
      <div className="ah-glass-card flex h-14 items-center justify-between rounded-2xl border border-white/70 bg-white/85 px-4 shadow-[0_8px_28px_rgba(17,20,33,0.12)]">
        <Link
          href={homePath}
          aria-label={messages.header.homeAria}
          title={messages.header.homeTitle}
          className="flex items-center gap-2"
        >
          <HeaderLogoIcon />
          <span className="text-label-small text-gray-70">Live Transit Console</span>
        </Link>
        <ul className="flex items-center gap-3">
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
          <li>
            <Link
              href={myPath}
              aria-label={messages.nav.me}
              title={messages.nav.me}
              className="inline-flex h-7 items-center rounded-full bg-gray-20 px-2 text-label-small text-gray-90"
            >
              {messages.nav.me}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
