'use client';

import type { ReactElement } from 'react';

import { usePathname } from 'next/navigation';

import { BottomNav, BottomNavItem } from '@ahhachul/ui';

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
  const locale = resolvePathLocale(pathname, null);
  const normalizedPathname = stripLocaleFromPathname(pathname);
  const messages = getLocaleMessages(locale);

  if (!ROOT_NAV_PATHS.includes(normalizedPathname as NavPath)) {
    return null;
  }

  return (
    <BottomNav itemCount={NAV_ITEMS.length}>
      {NAV_ITEMS.map(({ labelKey, href, renderIcon }) => {
        const isActive = normalizedPathname === href;
        const localizedHref = localizePathname(href, locale);
        const label = messages.nav[labelKey];

        return (
          <BottomNavItem
            key={href}
            label={label}
            isActive={isActive}
            href={localizedHref}
            icon={renderIcon({ isActive: false })}
            activeIcon={renderIcon({ isActive: true })}
          />
        );
      })}
    </BottomNav>
  );
}
