'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export const useCurrentPath = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return pathname + searchParams.toString();
};
