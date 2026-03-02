'use client';

import type { ReactElement } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import {
  CommunityNavActiveIcon,
  CommunityNavIcon,
  ComplaintNavActiveIcon,
  ComplaintNavIcon,
  HomeNavActiveIcon,
  HomeNavIcon,
  LostFoundNavActiveIcon,
  LostFoundNavIcon,
  ProfileNavActiveIcon,
  ProfileNavIcon,
} from '@/assets/icon';
import {
  getLocaleMessages,
  localizePathname,
  resolvePathLocale,
  stripLocaleFromPathname,
} from '@/i18n';

type NavPath = '/' | '/community' | '/lost-found' | '/complaint' | '/me';
type NavLabelKey = 'home' | 'community' | 'lostFound' | 'complaint' | 'me';

type NavIconProps = {
  isActive: boolean;
};

const ROOT_NAV_PATHS: readonly NavPath[] = ['/', '/community', '/lost-found', '/complaint', '/me'];

const HomeIcon = ({ isActive }: NavIconProps) => {
  return isActive ? (
    <HomeNavActiveIcon width={20} height={20} />
  ) : (
    <HomeNavIcon width={20} height={20} />
  );
};

const CommunityIcon = ({ isActive }: NavIconProps) => {
  return isActive ? (
    <CommunityNavActiveIcon width={20} height={20} />
  ) : (
    <CommunityNavIcon width={20} height={20} />
  );
};

const LostFoundIcon = ({ isActive }: NavIconProps) => {
  return isActive ? (
    <LostFoundNavActiveIcon width={20} height={20} />
  ) : (
    <LostFoundNavIcon width={20} height={20} />
  );
};

const ComplaintIcon = ({ isActive }: NavIconProps) => {
  return isActive ? (
    <ComplaintNavActiveIcon width={20} height={20} />
  ) : (
    <ComplaintNavIcon width={20} height={20} />
  );
};

const ProfileIcon = ({ isActive }: NavIconProps) => {
  return isActive ? (
    <ProfileNavActiveIcon width={20} height={20} />
  ) : (
    <ProfileNavIcon width={20} height={20} />
  );
};

const NAV_ITEMS: ReadonlyArray<{
  labelKey: NavLabelKey;
  href: NavPath;
  renderIcon: (props: NavIconProps) => ReactElement;
}> = [
  { labelKey: 'home', href: '/', renderIcon: HomeIcon },
  { labelKey: 'community', href: '/community', renderIcon: CommunityIcon },
  { labelKey: 'lostFound', href: '/lost-found', renderIcon: LostFoundIcon },
  { labelKey: 'complaint', href: '/complaint', renderIcon: ComplaintIcon },
  { labelKey: 'me', href: '/me', renderIcon: ProfileIcon },
];

export default function NavMenu() {
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const locale = resolvePathLocale(pathname, null);
  const normalizedPathname = stripLocaleFromPathname(pathname);
  const messages = getLocaleMessages(locale);

  if (!ROOT_NAV_PATHS.includes(normalizedPathname as NavPath)) {
    return null;
  }

  return (
    <nav
      data-testid="bottom-nav"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-[536px] -translate-x-1/2"
    >
      <ul className="ah-glass-card grid grid-cols-5 rounded-2xl border border-white/70 bg-white/90 px-1 py-1 shadow-[0_12px_28px_rgba(14,18,31,0.2)]">
        {NAV_ITEMS.map(({ labelKey, href, renderIcon }) => {
          const isActive = normalizedPathname === href;
          const localizedHref = localizePathname(href, locale);
          const label = messages.nav[labelKey];

          return (
            <li key={href} className="list-none">
              <button
                data-testid="bottom-nav-item"
                data-active={isActive ? 'true' : 'false'}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex w-full flex-col items-center justify-center gap-1 rounded-xl py-2 text-[11px] transition',
                  isActive
                    ? 'bg-key-color/15 text-key-color'
                    : 'text-gray-70 hover:bg-gray-20 hover:text-gray-90',
                ].join(' ')}
                onClick={() => {
                  router.push(localizedHref);
                }}
              >
                <span className="inline-flex h-5 w-5 items-center justify-center">
                  {renderIcon({ isActive })}
                </span>
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
