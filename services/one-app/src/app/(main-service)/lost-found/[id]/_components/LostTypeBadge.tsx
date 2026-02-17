'use client';

import { usePathname } from 'next/navigation';

import { ServiceBadge } from '@ahhachul/ui';

import { getLocaleMessages, resolvePathLocale } from '@/i18n';
import type { LostFoundType } from '@/types';

interface Props {
  lostFoundType: LostFoundType;
}

export const LostTypeBadge = ({ lostFoundType }: Props) => {
  const pathname = usePathname() ?? '/lost-found';
  const locale = resolvePathLocale(pathname, null);
  const copy = getLocaleMessages(locale).badges.lostType;

  return (
    <ServiceBadge
      label={lostFoundType === 'LOST' ? copy.lost : copy.acquire}
      className="text-label-small"
      style={{
        minHeight: '28px',
        padding: '0 10px',
      }}
    />
  );
};
