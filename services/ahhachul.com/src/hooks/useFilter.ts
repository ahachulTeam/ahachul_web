import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

import {
  createHref,
  createQueryString,
  deleteQueryString,
} from "~/utils/helper/navigation";
import { removeEmptyProperties } from "~/utils/helper/format";

export const useFilter = <T extends string>(...filterKeys: T[]) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filter = useMemo(
    () =>
      removeEmptyProperties(
        filterKeys.reduce(
          (acc, key) => ({ ...acc, [key]: searchParams.get(key) ?? "" }),
          {} as Record<T, string>,
        ),
      ),
    [filterKeys, searchParams],
  );

  const handleApplyFilter = useCallback(
    (key: string) => (value: string) => {
      const params = createQueryString(searchParams, { key, value });

      router.push(createHref(pathname, params));
    },
    [pathname, router, searchParams],
  );

  const handleResetFilter = useCallback(() => {
    const params = deleteQueryString(searchParams, ...filterKeys);

    router.push(createHref(pathname, params));
  }, [filterKeys, pathname, router, searchParams]);

  return {
    filter,
    handleApplyFilter,
    handleResetFilter,
  };
};