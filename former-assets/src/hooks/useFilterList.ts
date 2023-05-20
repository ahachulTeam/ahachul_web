import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

import { createHref, createQueryString, deleteQueryString } from "@/utils/navigation";

const useFilterList = <T extends string[]>(...filterKeys: T) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filter = useMemo(
    () =>
      filterKeys.reduce(
        (acc, key) => ({ ...acc, [key]: searchParams.get(key) ?? "" }),
        {} as Record<T[number], string>
      ),
    [router, filterKeys]
  );

  const handleApplyFilter = useCallback(
    (key: string) => (value: string) => {
      const params = createQueryString(searchParams, { key, value });

      router.replace(createHref(pathname, params));
    },
    [router, searchParams]
  );

  const handleResetFilter = useCallback(() => {
    const params = deleteQueryString(searchParams, ...filterKeys);

    router.replace(createHref(pathname, params));
  }, [router, searchParams]);

  return {
    filter,
    handleApplyFilter,
    handleResetFilter,
  };
};

export default useFilterList;
