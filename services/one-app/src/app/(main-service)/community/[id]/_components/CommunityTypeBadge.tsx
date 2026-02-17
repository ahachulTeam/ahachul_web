'use client';

import { usePathname } from 'next/navigation';

import { ServiceBadge } from '@ahhachul/ui';

import { getLocaleMessages, resolvePathLocale } from '@/i18n';
import { CommunityType } from '@/types/community';

interface Props {
  communityType: CommunityType;
}

export const CommunityTypeBadge = ({ communityType }: Props) => {
  const pathname = usePathname() ?? '/community';
  const locale = resolvePathLocale(pathname, null);
  const copy = getLocaleMessages(locale).badges.community;
  let label = copy.info;
  if (communityType === CommunityType.FREE) {
    label = copy.free;
  } else if (communityType === CommunityType.HUMOR) {
    label = copy.humor;
  }

  return (
    <ServiceBadge
      label={label}
      className="text-label-small"
      style={{
        minHeight: '28px',
        padding: '0 10px',
      }}
    />
  );
};
